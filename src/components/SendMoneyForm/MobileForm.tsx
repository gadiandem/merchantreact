import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'

import { countryList } from '@/constants/countries.constant'
import { FormItem, Form } from '@/components/ui/Form'
import AccountTypeSelect from '@/components/shared/AccountTypeSelect'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Radio from '@/components/ui/Radio'
import Button from '@/components/ui/Button'
import { zodResolver } from '@hookform/resolvers/zod'

type Option = {
    value: string
    label: string
}

type MobileFormSchema = {
    accountType: string
    country: string
    mobile: string
    amount: number
    beneficiary: string
    mobileType: string
    message?: string
}

const validationSchema: ZodType<MobileFormSchema> = z.object({
    accountType: z.string().min(1),
    country: z.string().min(1),
    mobile: z.string().min(10).max(15),
    amount: z.number().min(1),
    beneficiary: z.string().min(1),
    mobileType: z.string().min(1),
    message: z.string().optional(),
})

const countries: Option[] = countryList;
const options: Option[] = [
    { value: 'BUNNA', label: 'Bunna Card' },
    { value: 'VISACARD', label: 'Visa Card' },
    { value: 'MASTERCARD', label: 'Mastercard' },
]

export default function MobileForm({ onCancel }: { onCancel: () => void }) {

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<MobileFormSchema>({
        defaultValues: {
            accountType: '',
            country: '',
            mobile: '',
            amount: 0,
            beneficiary: '',
            mobileType: '',
            message: '',
        },
        resolver: zodResolver(validationSchema),
        mode: 'onBlur'
    })

    const onSubmit = (values: MobileFormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Account Source" invalid={Boolean(errors.accountType)} errorMessage={errors.accountType?.message} >
                    <AccountTypeSelect control={control} name="accountType" error={errors.accountType?.message} />
                </FormItem>

                <FormItem asterisk label="Country" invalid={Boolean(errors.country)} errorMessage={errors.country?.message} >
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
                <FormItem asterisk label="Mobile Number" invalid={Boolean(errors.mobile)} errorMessage={errors.mobile?.message}>
                    <Controller name="mobile" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="Amount" invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                    <Controller name="amount" control={control} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value) || 0)} />} />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Beneficiary" invalid={Boolean(errors.beneficiary)} errorMessage={errors.beneficiary?.message}>
                    <Controller name="beneficiary" control={control} render={({ field }) => <Input {...field} />} />
                </FormItem>

                <FormItem asterisk label="Type" invalid={Boolean(errors.mobileType)} errorMessage={errors.mobileType?.message}>
                    <Controller name="mobileType" control={control}
                        render={({ field }) =>
                            <Radio.Group {...field}>
                                <Radio value={'INDIVIDUAL'}>Individual</Radio>
                                <Radio value={'COMPANY'}>Company</Radio>
                            </Radio.Group>
                        }
                    />
                </FormItem>
            </div>

            <FormItem label="Message" invalid={Boolean(errors.message)} errorMessage={errors.message?.message}>
                <Controller name="message" control={control} render={({ field }) => <Textarea {...field} />} />
            </FormItem>

            <div className="inline-flex flex-wrap xl:flex gap-2">
                <Button type="submit" variant="solid">Submit</Button>
                <Button variant='plain' onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    )
}
