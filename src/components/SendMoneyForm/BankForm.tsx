import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { Option } from '@/@types/common'
import { countryList } from '@/constants/countries.constant'

import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Radio from '@/components/ui/Radio'
import Button from '@/components/ui/Button'
import AccountTypeSelect from '@/components/shared/AccountTypeSelect'

type BankFormSchema = {
    accountSource: string
    country: string
    accName: string
    accNumber: string
    swiftCode: string
    amount: number
    beneficiaryName: string
    beneficiaryType: string
    street1: string
    street2?: string
    city: string
    postalCode: string
    mobileNumber: string
    message?: string
}

const validationSchema: ZodType<BankFormSchema> = z.object({
    accountSource: z.string().min(1, 'Source account is required'),
    country: z.string().min(1, 'Country is required'),
    accName: z.string().min(1, 'Account name is required'),
    accNumber: z.string().min(1, 'Account number is required'),
    swiftCode: z.string().min(1, 'Swift Code is required'),
    amount: z.number().positive('Amount must be a positive number'),
    beneficiaryName: z.string().min(1, 'Beneficiary name is required'),
    beneficiaryType: z.string().min(1, 'Beneficiary type is required'),
    street1: z.string().min(1, 'Street is required'),
    street2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal Code is required'),
    mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
    message: z.string().optional()
})

const countries: Option[] = countryList
const options: Option[] = [
    { value: 'BUNNA', label: 'Bunna Card' },
    { value: 'VISACARD', label: 'Visa Card' },
    { value: 'MASTERCARD', label: 'Martercard' },
]

export default function BankForm({ onCancel }: { onCancel: () => void }) {

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<BankFormSchema>({
        defaultValues: {
            accountSource: '',
            country: ''
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: BankFormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Account Source" invalid={Boolean(errors.accountSource)} errorMessage={errors.accountSource?.message}>
                    <AccountTypeSelect control={control} name="accountSource" error={errors.accountSource?.message} />
                </FormItem>

                <FormItem asterisk label="Country" invalid={Boolean(errors.country)} errorMessage={errors.country?.message}>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Beneficiary's Bank" invalid={Boolean(errors.accName)} errorMessage={errors.accName?.message}>
                    <Controller name="accName" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="IBAN/Account Number" invalid={Boolean(errors.accNumber)} errorMessage={errors.accNumber?.message}>
                    <Controller name="accNumber" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Swift Code" invalid={Boolean(errors.swiftCode)} errorMessage={errors.swiftCode?.message}>
                    <Controller name="swiftCode" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="Amount" invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                    <Controller name="amount" control={control} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />} />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Beneficiary Name" invalid={Boolean(errors.beneficiaryName)} errorMessage={errors.beneficiaryName?.message}>
                    <Controller name="beneficiaryName" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="Type" invalid={Boolean(errors.beneficiaryType)} errorMessage={errors.beneficiaryType?.message}>
                    <Controller name="beneficiaryType" control={control}
                        render={({ field }) =>
                            <Radio.Group {...field}>
                                <Radio value={'INDIVIDUAL'}>Individual</Radio>
                                <Radio value={'COMPANY'}>Company</Radio>
                            </Radio.Group>
                        }
                    />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Street 1" invalid={Boolean(errors.street1)} errorMessage={errors.street1?.message}>
                    <Controller name="street1" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem label="Street 2">
                    <Controller name="street2" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="City" invalid={Boolean(errors.city)} errorMessage={errors.city?.message}>
                    <Controller name="city" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="Postal Code" invalid={Boolean(errors.postalCode)} errorMessage={errors.postalCode?.message}>
                    <Controller name="postalCode" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>
            </div>

            <FormItem asterisk label="Mobile Number" invalid={Boolean(errors.mobileNumber)} errorMessage={errors.mobileNumber?.message}>
                <Controller name="mobileNumber" control={control} render={({ field }) => <Input {...field} />} />
            </FormItem>

            <FormItem label="Message" invalid={Boolean(errors.message)} errorMessage={errors.message?.message}>
                <Controller name="message" control={control} render={({ field }) => <Textarea {...field} />} />
            </FormItem>

            <div className="inline-flex flex-wrap xl:flex gap-2">
                <Button type="submit" variant="solid" disabled={isSubmitting}>Submit</Button>
                <Button variant='plain' onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    )
}