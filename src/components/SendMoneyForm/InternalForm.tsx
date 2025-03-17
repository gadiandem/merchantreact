import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Form, FormItem } from '@/components/ui/Form';
import AccountTypeSelect from '@/components/shared/AccountTypeSelect';

type FormSchema = {
    to: string
    amount: number
    accountSource: string
    subject: string
    note?: string
}

const validationSchema: ZodType<FormSchema> = z.object({
    to: z.string().min(1, 'Please input recipient!').min(3, 'Too Short!').max(100),
    amount: z.number().min(1),
    accountSource: z.string().min(1),
    subject: z.string().min(1),
    note: z.string().optional(),
})

export default function InternalForm({ onCancel }: { onCancel: () => void }) {
    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            to: '',
            amount: 0,
            accountSource: '',
            subject: '',
            note: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem asterisk label="To" invalid={Boolean(errors.to)} errorMessage={errors.to?.message}>
                <Controller name="to" control={control} render={({ field }) => <Input {...field} />} />
            </FormItem>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormItem asterisk label="Amount" invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                    <Controller name="amount" control={control} render={({ field }) => <Input type="number" {...field} />} />
                </FormItem>

                <FormItem asterisk label='Account Source' invalid={Boolean(errors.accountSource)} errorMessage={errors.accountSource?.message}>
                    <AccountTypeSelect control={control} name="accountSource" error={errors.accountSource?.message} />
                </FormItem>
            </div>

            <FormItem asterisk label="Email Subject" invalid={Boolean(errors.subject)} errorMessage={errors.subject?.message}>
                <Controller name="subject" control={control} render={({ field }) => <Input {...field} />} />
            </FormItem>

            <FormItem label="Note">
                <Controller name="note" control={control} render={({ field }) => <Textarea {...field} rows={3} />} />
            </FormItem>

            <div className="inline-flex flex-wrap xl:flex mt-4 gap-2">
                <Button type="submit" variant="solid">Submit</Button>
                <Button variant='plain' onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    );
}
