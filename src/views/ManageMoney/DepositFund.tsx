import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Option } from '@/@types/common';
import { countryList } from '@/constants/countries.constant';
import isEmpty from '@/utils/isEmpty';

import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button';
import { Form, FormItem } from '@/components/ui/Form';
import useCurrencies from '@/utils/hooks/useCurrencies';

type FormSchema = {
    country: string
    currency: string
    amount: number
    paymentOption: string
}

const countries: Option[] = countryList

// To-do Replace with real values
const options: Option[] = [
    { value: '8', label: 'Debit & Credit Cards (CARD)' },
]

const validationSchema: ZodType<FormSchema> = z.object({
    country: z.string().min(1),
    currency: z.string().min(1),
    amount: z.number().min(1),
    paymentOption: z.string().min(1),
})

const DepositFund = () => {
    const { currencies } = useCurrencies();
    const [step, setStep] = useState(1);

    const {
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isSubmitting },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            country: '',
            currency: '',
            amount: 0,
            paymentOption: '',
        },
        resolver: zodResolver(validationSchema),
        mode: 'onBlur'
    })

    const onSubmit = (values: FormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    const formValues = watch();

    const formattedCurrencies: Option[] = [];
    if (!isEmpty(currencies)) {
        currencies.forEach((currency: any) => {
            formattedCurrencies.push({ value: currency.code, label: `${currency.name} - ${currency.longName}` });
        })
    }

    return (
        <Card>
            <h5>Deposit Money</h5>

            <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (<div id='step1'>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormItem asterisk label="Currency" invalid={Boolean(errors.currency)} errorMessage={errors.currency?.message}>
                            <Controller name="currency" control={control} render={({ field }) =>
                                <Select
                                    options={formattedCurrencies}
                                    {...field}
                                    value={formattedCurrencies.find((option) => option.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            }
                            />
                        </FormItem>

                        <FormItem label="Amount" invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                            <Controller name="amount" control={control} render={({ field }) => (
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                                />
                            )} />
                        </FormItem>
                    </div>
                </div>)}

                {step === 2 && (
                    <div id='step2' className="flex flex-col gap-8">
                        <div>
                            <span className="text-md mb-3 font-semibold">
                                Country
                            </span>
                            <p>{formValues.country}</p>
                        </div>

                        <div>
                            <span className="text-md mb-3 font-semibold">
                                Currency
                            </span>
                            <p>{formValues.currency}</p>
                        </div>

                        <div>
                            <span className="text-md mb-3 font-semibold">
                                Amount
                            </span>
                            <p>{formValues.amount}</p>
                        </div>

                        <FormItem asterisk label="Payment Option" invalid={Boolean(errors.paymentOption)} errorMessage={errors.paymentOption?.message}>
                            <Controller name="paymentOption" control={control} render={({ field }) =>
                                <Select
                                    options={options}
                                    {...field}
                                    value={options.find((option) => option.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            }
                            />
                        </FormItem>
                    </div>
                )}

                <div className="inline-flex flex-wrap xl:flex gap-2">
                    <Button
                        variant="solid"
                        type={step === 1 ? "button" : "submit"}
                        disabled={isSubmitting || !isEmpty(errors)}
                        onClick={async () => {
                            if (step === 1) {
                                const isValid = await trigger(['country', 'currency', 'amount']);
                                if (isValid) setStep(2);
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
        </Card>
    )
}

export default DepositFund