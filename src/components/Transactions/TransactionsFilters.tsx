import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useForm, Controller } from 'react-hook-form'
import { Option, TransactionFilterFormSchema } from '@/@types/common'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import ExportTransactionsDialog from './ExportTransactionsDialog'

import { countryList } from '@/constants/countries.constant'
import removeEmpty from '@/utils/removeEmpty'
import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

type TransactionsFiltersProps = {
    filters: TransactionFilterFormSchema;
    setFilters: (filters: TransactionFilterFormSchema) => void;
    onFilter: (data: any) => void;
    setLoading: (loading: boolean) => void;
    page: number;
};

// const transactionMode: Option[] = [
//     { value: 'ALL', label: 'All' },
//     { value: 'Vterminal', label: 'V-Terminal: Pay by Link' },
//     { value: 'Invoice', label: 'E-Invoice' },
//     { value: 'Online', label: 'Online' },
// ]

const _transactionTypes: Option[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Only Debits', value: 'ONLY_DEBITS' },
    { label: 'Only Credits', value: 'ONLY_CREDITS' },
    // { value: 'Ecommerce', label: 'Ecommerce' },
    // { value: 'Send cash', label: 'Send cash' },
    // { value: 'Bill payment', label: 'Bill payment' },
    // { value: 'Deposit', label: 'Deposit' },
    // { value: 'Fee', label: 'Fee' },
    // { value: 'Reversal', label: 'Reversal' },
]

// const transactionStatus: Option[] = [
//     { value: 'ALL', label: 'All' },
//     { value: 'Complete', label: 'Complete' },
//     { value: 'PendingRefund', label: 'Pending Refund' },
//     { value: 'Refund', label: 'Refund' },
//     { value: 'PartialRefund', label: 'Partial Refund' },
// ]

const paymentType: Option[] = [
    { label: "ALL", value: "ALL" },
    { label: "CARD", value: "CARD" },
    { label: "MOBILE", value: "MOBILE" },
    // { label: "FCMS", value: "FCMS" },
    // { label: "KEYIN CARD", value: "KEYIN_CARD" },
    // { label: "BANK", value: "BANK" },
    // { label: "BITCOIN", value: "BITCOIN" },
    // { label: "WALLET", value: "WALLET" }
]

const countries: Option[] = [
    { value: 'ALL', label: 'All' },
    ...countryList
]

export default function TransactionsFilters({
    page,
    filters,
    setFilters,
    onFilter,
    setLoading
}: TransactionsFiltersProps) {
    const [transactionTypes, setTransactionTypes] = useState(_transactionTypes);
    const [paymentPartners, setPaymentPartners] = useState<any>([]);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        const payload = {
            dateFrom: format(filters.dateFrom as Date, 'dd/MM/yyyy'),
            dateTo: format(filters.dateTo as Date, 'dd/MM/yyyy'),
            txnRef: filters.referenceNo,
            depositId: filters.transId,
            transType: filters.transType,
            paymentType: filters.paymentType === 'ALL' ? null : filters.paymentType,
            country: filters.country === 'ALL' ? null : filters.country,
            page
        };
        const cleanPayload = removeEmpty(payload);

        try {
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.searchTransactions,
                method: 'post',
                data: cleanPayload
            });

            onFilter(resp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('Error fetching transactions: ', error);
        }
    }

    const fetchPaymentPartners = async () => {
        try {
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.getPaymentPartners,
                method: 'get'
            });

            setPaymentPartners(resp);
        } catch (error) {
            setLoading(false);
            console.log('Error fetching acqurirers: ', error);
        }
    }

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<TransactionFilterFormSchema>({
        defaultValues: filters
    });

    const onSubmit = async (values: TransactionFilterFormSchema) => {
        const payload: any = { ...values }
        const cleanPayload = removeEmpty(payload)

        // await new Promise((r) => setTimeout(r, 500))
        setFilters(cleanPayload)
    }

    const handleExport = async () => {
        setExportDialogOpen(true)
    }

    useEffect(() => {
        fetchData();
    }, [page, filters])

    useEffect(() => {
        fetchPaymentPartners()
    }, [])

    useEffect(() => {
        const newPartners = paymentPartners.map((partner: any) => ({ label: partner.name, value: partner.id }))
        const transTypes = [..._transactionTypes, ...newPartners]
        setTransactionTypes(transTypes)
    }, [paymentPartners])

    return (
        <>
            <Card>
                <h5>Filters</h5>

                <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-3'>
                        <FormItem asterisk label='Start' invalid={Boolean(errors.dateFrom)} errorMessage={errors.dateFrom?.message}>
                            <Controller name="dateFrom" control={control} render={({ field }) => <DatePicker {...field} />} />
                        </FormItem>
                        <FormItem asterisk label='End' invalid={Boolean(errors.dateFrom)} errorMessage={errors.dateFrom?.message}>
                            <Controller name="dateTo" control={control} render={({ field }) => <DatePicker {...field} />} />
                        </FormItem>

                        <FormItem label="Reference No.">
                            <Controller name="referenceNo" control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>

                        <FormItem label="Transaction/Deposit ID">
                            <Controller name="transId" control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>

                        {/* <FormItem label="Transaction Mode">
                        <Controller name="transMode" control={control}
                            render={({ field }) =>
                                <Select
                                    options={transactionMode}
                                    {...field}
                                    value={transactionMode.find((option) => option.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            }
                        />
                    </FormItem> */}

                        <FormItem label="Transaction Type">
                            <Controller name="transType" control={control}
                                render={({ field }) =>
                                    <Select
                                        options={transactionTypes}
                                        {...field}
                                        value={transactionTypes.find((option) => option.value === field.value)}
                                        onChange={(option) => field.onChange(option?.value)}
                                    />
                                }
                            />
                        </FormItem>

                        {/* <FormItem  label="Transaction Status">
                        <Controller name="transStatus" control={control}
                            render={({ field }) =>
                                <Select
                                    options={transactionStatus}
                                    {...field}
                                    value={transactionStatus.find((option) => option.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            }
                        />
                    </FormItem> */}

                        <FormItem label="Payment Type">
                            <Controller name="paymentType" control={control}
                                render={({ field }) =>
                                    <Select
                                        options={paymentType}
                                        {...field}
                                        value={paymentType.find((option) => option.value === field.value)}
                                        onChange={(option) => field.onChange(option?.value)}
                                    />
                                }
                            />
                        </FormItem>

                        <FormItem label="Country">
                            <Controller name="country" control={control}
                                render={({ field }) =>
                                    <Select
                                        options={countries}
                                        {...field}
                                        value={countries.find((option) => option.value === field.value)}
                                        onChange={(option) => field.onChange(option?.value)}
                                    />
                                }
                            />
                        </FormItem>
                    </div>

                    <div className='flex gap-2'>
                        <FormItem>
                            <Button disabled={isSubmitting} variant="solid" type="submit">
                                {isSubmitting ? 'Loading' : 'Search'}
                            </Button>
                        </FormItem>

                        <FormItem>
                            <Button onClick={handleExport} variant="default" type="button">Export</Button>
                        </FormItem>
                    </div>
                </Form>
            </Card>

            {exportDialogOpen && <ExportTransactionsDialog
                isDialogOpen={exportDialogOpen}
                dateFrom={format(filters.dateFrom as Date, 'dd/MM/yyyy')}
                dateTo={format(filters.dateTo as Date, 'dd/MM/yyyy')}
                handleOnDialogClose={setExportDialogOpen}
                key={[exportDialogOpen, filters.dateFrom, filters.dateTo]}
            />
            }
        </>
    );
}