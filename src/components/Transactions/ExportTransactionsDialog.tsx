import { useEffect, useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

import type { ChangeEvent } from 'react'

const ExportTransactionsDialog = ({ isDialogOpen, dateFrom, dateTo, handleOnDialogClose }: any) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(isDialogOpen)
    const [loadingHeaders, setLoadingHeaders] = useState(true)
    const [transactionHeaders, setTransactionHeaders] = useState<any>([])
    const [selectedTransactionHeaders, setSelectedTransactionHeaders] = useState<any>([])
    const [exporting, setExporting] = useState(false)

    const onDialogClose = () => {
        setDialogIsOpen(false)
        handleOnDialogClose(false)
    }

    const onExportClick = async () => {
        setExporting(true);

        const payload = {
            dateFrom,
            dateTo,
            columnHeaders: transactionHeaders
                .filter((item: any) => selectedTransactionHeaders.includes(item.columnKey))
        };

        try {
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.exportTransactions,
                method: 'post',
                data: payload
            });

            setExporting(false);
            setDialogIsOpen(false);
            handleOnDialogClose(false);
            toast.push(
                <Notification
                    title="Exporting Transactions"
                    type='success'
                >
                    {resp.message}
                </Notification>
            )
        } catch (error) {
            setExporting(false);
            console.log('Error exporting transactions: ', error);
        }
    }

    const onCheck = (checked: boolean, e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setSelectedTransactionHeaders((prev: any) =>
            checked ? [...prev, name] : prev.filter((item: any) => item !== name)
        );
    };

    const fetchTransactionHeaders = async () => {
        try {
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.getExportTransactionHeaders,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {}
            });

            setTransactionHeaders(resp);
            setSelectedTransactionHeaders(resp.map((item: any) => item.columnKey));
            setLoadingHeaders(false);
        } catch (error) {
            setLoadingHeaders(false);
            console.log('Error fetching headers: ', error);
        }
    }

    useEffect(() => {
        fetchTransactionHeaders()
    }, [])

    console.log('Headers: ', transactionHeaders)
    console.log('Selected Headers: ', selectedTransactionHeaders)

    return (
        <Dialog
            isOpen={dialogIsOpen}
            width={800}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <div className="flex flex-col h-full justify-between">
                <h5 className="mb-4">Custom Export File</h5>
                <div className="max-h-96 overflow-y-auto">
                    {loadingHeaders ? <p>Loading...</p> : <div className='grid grid-cols-2 gap-2'>
                        {transactionHeaders.map((item: any, index: number) =>
                            <div key={index}>
                                <Checkbox
                                    defaultChecked
                                    // checked={selectedTransactionHeaders.includes(item.columnKey)}
                                    name={item.columnKey}
                                    onChange={onCheck}
                                >
                                    {item.columnText}
                                </Checkbox>
                            </div>
                        )}
                    </div>}
                </div>

                <div className="text-right mt-6">
                    <Button
                        type='button'
                        // className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Close
                    </Button>
                    <Button
                        type='submit'
                        // className="ltr:mr-2 rtl:ml-2"
                        variant="solid"
                        loading={exporting}
                        onClick={onExportClick}
                    >
                        Export
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ExportTransactionsDialog