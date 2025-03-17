import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod';

import isEmpty from '@/utils/isEmpty';
import { countryList } from '@/constants/countries.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormItem, Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Radio from '@/components/ui/Radio';
import Switcher from '@/components/ui/Switcher';
import Button from '@/components/ui/Button';

type Option = {
    value: string;
    label: string;
};

type CardFormSchema = {
    type: string;
    country: string;
    cardNumber: string;
    issued: boolean;
    cardType: string;
    accountSource: string;
    amount: number;
    beneficiary: string;
    mobileNumber: string;
    message?: string;
};

const validationSchema: ZodType<CardFormSchema> = z.object({
    type: z.string().min(1, 'Card type is required'),
    country: z.string().min(1, 'Country is required'),
    cardNumber: z.string().min(1, 'Card number is required'),
    issued: z.literal<boolean>(true, { errorMap: () => ({ message: 'You must turn this on!' }) }),
    cardType: z.string().min(1, 'Card type is required'),
    accountSource: z.string().min(1, 'Account source is required'),
    amount: z.number().min(1, 'Amount must be greater than 0'),
    beneficiary: z.string().min(1, 'Beneficiary is required'),
    mobileNumber: z.string().min(1, 'Mobile number is required'),
    message: z.string().optional(),
});

const countries: Option[] = countryList
const options: Option[] = [
    { value: 'BUNNA', label: 'Bunna Card' },
    { value: 'VISACARD', label: 'Visa Card' },
    { value: 'MASTERCARD', label: 'Mastercard' },
];
const currency: Option[] = [
    { value: 'USD', label: 'USD' },
    { value: 'NGN', label: 'NGN' },
];

export default function CardForm({ onCancel }: { onCancel: () => void }) {
    const [step, setStep] = useState(1);

    const {
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
        control,
    } = useForm<CardFormSchema>({
        defaultValues: {
            type: '',
            country: '',
            cardNumber: '',
            issued: false,
            cardType: '',
            accountSource: '',
            amount: 0,
            beneficiary: '',
            mobileNumber: '',
            message: '',
        },
        resolver: zodResolver(validationSchema),
        mode: 'onChange',
    });

    const onSubmit = (values: CardFormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
                <div id='step1'>
                    <FormItem asterisk label='Card Type' invalid={Boolean(errors.type)} errorMessage={errors.type?.message}>
                        <Controller name='type' control={control}
                            render={({ field }) => (
                                <Select
                                    options={options}
                                    {...field}
                                    value={options.find(option => option.value === field.value)}
                                    onChange={option => field.onChange(option?.value)}
                                />
                            )}
                        />
                    </FormItem>
                </div>
            )}

            {step === 2 && (
                <div id='step2'>
                    <FormItem asterisk label='Country' invalid={Boolean(errors.country)} errorMessage={errors.country?.message}>
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
                        <FormItem asterisk label='Issued' invalid={Boolean(errors.issued)} errorMessage={errors.issued?.message}>
                            <Controller name="issued" control={control}
                                render={({ field }) =>
                                    <Switcher
                                        checked={field.value}
                                        onChange={checked => {
                                            field.onChange(checked)
                                        }}
                                    />
                                }
                            />
                        </FormItem>

                        <FormItem asterisk label='Card Number' invalid={Boolean(errors.cardNumber)} errorMessage={errors.cardNumber?.message}>
                            <Controller name='cardNumber' control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormItem
                            asterisk
                            label="Type"
                            invalid={Boolean(errors.cardType)}
                            errorMessage={errors.cardType?.message}
                        >
                            <Controller name="cardType" control={control}
                                render={({ field }) =>
                                    <Radio.Group {...field}>
                                        <Radio value={'INDIVIDUAL'}>Individual</Radio>
                                        <Radio value={'COMPANY'}>Company</Radio>
                                    </Radio.Group>
                                }
                            />
                        </FormItem>

                        <FormItem asterisk label='Account Source' invalid={Boolean(errors.accountSource)} errorMessage={errors.accountSource?.message}>
                            <Controller name='accountSource' control={control}
                                render={({ field }) => (
                                    <Select
                                        options={currency}
                                        {...field}
                                        value={currency.find(option => option.value === field.value)}
                                        onChange={option => field.onChange(option?.value)}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormItem asterisk label='Beneficiary' invalid={Boolean(errors.beneficiary)} errorMessage={errors.beneficiary?.message}>
                            <Controller name='beneficiary' control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>

                        <FormItem asterisk label='Mobile Number' invalid={Boolean(errors.mobileNumber)} errorMessage={errors.mobileNumber?.message}>
                            <Controller name='mobileNumber' control={control} render={({ field }) => <Input {...field} />} />
                        </FormItem>
                    </div>

                    <FormItem asterisk label='Amount' invalid={Boolean(errors.amount)} errorMessage={errors.amount?.message}>
                        <Controller name='amount' control={control}
                            render={({ field }) => (
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem label='Message'>
                        <Controller name='message' control={control} render={({ field }) => <Textarea {...field} rows={3} />} />
                    </FormItem>
                </div>
            )}

            <div className='inline-flex flex-wrap xl:flex gap-2'>
                <Button
                    variant="solid"
                    type={step === 1 ? "button" : "submit"}
                    disabled={isSubmitting || (step === 1 && !isEmpty(errors))}
                    onClick={async (e) => {
                        if (step === 1) {
                            e.preventDefault();
                            const isValid = await trigger(["type"]); // Validate only Step 1 fields
                            if (isValid) setStep(2);
                        }
                    }}
                >
                    {step === 1 ? 'Next' : 'Submit'}
                </Button>

                {step !== 1 && <Button type='button' onClick={() => setStep(1)}>Back</Button>}
                <Button variant='plain' onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    );
}