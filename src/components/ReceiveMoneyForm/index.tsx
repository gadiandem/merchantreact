import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import isEmpty from '@/utils/isEmpty';
import { Option } from '@/@types/common';
import { Form, FormItem } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import AccountTypeSelect from '@/components/shared/AccountTypeSelect';

type FormSchema = {
    email: string
    mobileNumber: string
    amount: number
    account: string
    note?: string
}

const validationSchema: ZodType<FormSchema> = z.object({
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
    amount: z.number().min(1),
    account: z.string().min(1),
    note: z.string().optional(),
})

export default function ReceiveMoneyForm() {
    const [step, setStep] = useState(1);

    const {
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isSubmitting },
        control,
    } = useForm<FormSchema>({
        defaultValues: {
            email: '',
            mobileNumber: '',
            amount: 0,
            account: '',
            note: '',
        },
        resolver: zodResolver(validationSchema),
        mode: "onChange",
    })

    const onSubmit = (values: FormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    const formValues = watch();

    return (
        <div className='mt-4'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (<div id='step1'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormItem asterisk label="Email" invalid={Boolean(errors.email)} errorMessage={errors.email?.message}>
                            <Controller name="email" control={control} render={({ field }) => <Input type="email" {...field} />} />
                        </FormItem>

                        <FormItem asterisk label="Mobile Number" invalid={Boolean(errors.mobileNumber)} errorMessage={errors.mobileNumber?.message}>
                            <Controller name="mobileNumber" control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormItem asterisk label="Amount" invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                            <Controller name="amount" control={control}
                                render={({ field }) =>
                                    <Input
                                        type="number" {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                    />
                                }
                            />
                        </FormItem>

                        <FormItem asterisk label="Account" invalid={Boolean(errors.account)} errorMessage={errors.account?.message}>
                            <AccountTypeSelect control={control} name="account" error={errors.account?.message} />
                        </FormItem>
                    </div>

                    <FormItem label="Note">
                        <Controller name="note" control={control} render={({ field }) => <Textarea {...field} rows={3} />} />
                    </FormItem>
                </div>)}

                {step === 2 && (<div className="flex flex-col gap-8">
                    <div>
                        <span className="text-md mb-3 font-semibold">
                            Email
                        </span>
                        <p>{formValues.email}</p>
                    </div>

                    <div>
                        <span className="text-md mb-3 font-semibold">
                            Mobile
                        </span>
                        <p>{formValues.mobileNumber}</p>
                    </div>

                    <div>
                        <span className="text-md mb-3 font-semibold">
                            Amount
                        </span>
                        <p>{formValues.amount}</p>
                    </div>

                    <div>
                        <span className="text-md mb-3 font-semibold">
                            Currency
                        </span>
                        <p>{formValues.account}</p>
                    </div>

                    <div>
                        <span className="text-md mb-3 font-semibold">
                            Notes
                        </span>
                        <p>{formValues.note}</p>
                    </div>
                </div>)}

                <div className="inline-flex flex-wrap xl:flex mt-4 gap-2">
                    <Button
                        variant="solid"
                        type={step === 1 ? "button" : "submit"}
                        disabled={isSubmitting || !isEmpty(errors)}
                        onClick={async (e) => {
                            if (step === 1) {
                                e.preventDefault(); // Prevent form submission
                                const isValid = await trigger(['email', 'mobileNumber', 'amount', 'account']); // Validate form fields
                                if (isValid) setStep(2); // Move to step 2 only if valid
                            }
                        }}
                    >
                        {step === 1 ? 'Next' : 'Submit'}
                    </Button>
                    {step !== 1 && <Button type='button' onClick={() => setStep(1)}>
                        Back
                    </Button>}
                </div>
            </Form>
        </div>
    )
}