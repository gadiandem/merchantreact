
import { useState, useMemo } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import Dialog from '@/components/ui/Dialog'
import Tabs from '@/components/ui/Tabs'

import NotificationsTable from './NotificationsTable'
import RefundsTable from './RefundsTable'

import type { ColumnDef } from '@tanstack/react-table'
import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

const { Tr, Th, Td, THead, TBody } = Table
const { TabNav, TabList, TabContent } = Tabs

export default function TransactionsTable({ loading, onPaginate, transactions }: any) {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [transaction, setTransaction] = useState<any>(null)
    const [notifications, setNotifications] = useState<any[] | null>(null)
    const [refunds, setRefunds] = useState<any[] | null>(null)

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'txnId',
            },
            {
                header: 'Date',
                accessorKey: 'postDate',
            },
            {
                header: 'Type',
                accessorKey: 'fullTransType',
            },
            {
                header: 'Name/Email',
                accessorKey: 'userEmail',
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: 'Payment Option',
                accessorKey: 'paymentOption',
            },
            {
                header: 'Action',
                accessorKey: '',
                cell: ({ row }) => (
                    <Button type='button' variant='default' onClick={() => {
                        if (row.original) {
                            setTransaction(row.original);
                            fetchTransaction(row.original)
                        }
                    }} >
                        Details
                    </Button>
                ),
            },
        ],
        []
    )

    const table = useReactTable({
        data: transactions ? transactions.data : [],
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        onPaginate(page - 1)
        table.setPageIndex(page - 1)
    }

    const fetchTransaction = async (data: any) => {
        setLoadingDetails(true);
        setIsOpen(true);
        const id = data.id;
        try {
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.getTransactionDetails,
                method: 'get',
                params: {
                    txnId: id
                }
            });

            setTransaction(resp.transaction);
            setNotifications(resp.notifications ? resp.notifications : null);
            setRefunds(resp.refunds ? resp.refunds : null);
            setLoadingDetails(false);
        } catch (error) {
            setLoadingDetails(false);
            console.log('Error fetching transaction details: ', error);
        }
    }

    const onDialogClose = () => {
        setIsOpen(false)
        setTransaction(null)
    }

    return (
        <Card>
            <h5>Transactions</h5>

            {loading ? <p className='mt-4'>Loading...</p> : !loading && transactions && transactions.data.length > 0 ? <>
                <Table className='mt-4'>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <Pagination
                        pageSize={transactions?.itemsPerPage}
                        currentPage={transactions?.currentPage + 1}
                        total={transactions?.count}
                        onChange={onPaginationChange}
                    />
                </div>
            </> : <p className='mt-4'>No transactions</p>}

            <Dialog
                isOpen={dialogIsOpen}
                width={1000}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Information</h5>
                    <div className="max-h-96 overflow-y-auto">
                        <Tabs defaultValue="tab1">
                            <TabList>
                                <TabNav value="tab1">Transaction</TabNav>
                                <TabNav value="tab2">Notifications</TabNav>
                                <TabNav value="tab3">Refund Requests</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="tab1">
                                    {transaction && transaction !== null ? <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Transaction ID</span>
                                            <div className="">{transaction.transNumber}</div>
                                        </div>
                                        <div />

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Custom</span>
                                            <div className="">{transaction.custom}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Detail</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">FloCash Partner Ref.</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div />

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Transaction Type</span>
                                            <div className="">{transaction.fullTransType}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Processed Date</span>
                                            <div className="">{transaction.postDateTime}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Amount</span>
                                            <div className="">{transaction.amount}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Name/Email</span>
                                            <div className="">{transaction.destUserEmail}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Reference</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Status</span>
                                            <div className="">{transaction.status}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Payment Option</span>
                                            <div className="">{transaction.paymentOption}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Merchant Order</span>
                                            <div className="">{transaction.ecomOrder}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Auth Code</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">IP Address</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Ticketed(for airlines only)</span>
                                            <div className="">{''}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold capitalize">Ticket Number</span>
                                            <div className="">{''}</div>
                                        </div>
                                    </div> : null}
                                </TabContent>
                                <TabContent value="tab2">
                                    {loadingDetails ? <p>Loading...</p> : !loadingDetails && notifications !== null && notifications.length === 0 ?
                                        <p>No notifications found</p> : !loadingDetails && notifications !== null && notifications.length > 0 ? <NotificationsTable notifications={notifications} /> : null}
                                </TabContent>
                                <TabContent value="tab3">
                                    {loadingDetails ? <p>Loading...</p> : !loadingDetails && refunds !== null && refunds.length === 0 ?
                                        <p>No refunds found</p> : !loadingDetails && refunds !== null && refunds.length > 0 ? <RefundsTable refunds={refunds} /> : null}
                                </TabContent>
                            </div>
                        </Tabs>
                    </div>

                    <div className="text-right mt-6">
                        <Button
                            type='button'
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Card>
    )
}

