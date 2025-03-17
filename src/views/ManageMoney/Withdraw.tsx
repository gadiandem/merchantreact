import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@/components/ui/Card';
import { Form, FormItem } from '@/components/ui/Form';
import Radio from '@/components/ui/Radio';
import Button from '@/components/ui/Button';
import BalanceCard from "@/components/shared/BalanceCard";
import DepositLimitCard from "@/components/shared/DepositLimitCard";
import UserDetailsCard from "@/components/shared/UserDetailsCard";

type FormSchema = {
    accountType: string
}

const validationSchema: ZodType<FormSchema> = z.object({
    accountType: z.string().min(1),
})

const Withdraw = () => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            accountType: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 400)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4">
                <div className="flex flex-col gap-4 col-span-2">
                    <Card>
                        <h5>Withdraw Money</h5>

                        <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                            <FormItem
                                asterisk
                                label="Account"
                                invalid={Boolean(errors.accountType)}
                                errorMessage={errors.accountType?.message}
                            >
                                <Controller
                                    name="accountType"
                                    control={control}
                                    render={({ field }) =>
                                        <Radio.Group vertical {...field}>
                                            <Radio value={'card'}>Card</Radio>
                                            <Radio value={'bank'}>Bank</Radio>
                                        </Radio.Group>
                                    }
                                />
                            </FormItem>

                            <div className="inline-flex flex-wrap xl:flex gap-2">
                                <Button variant="solid" type='submit' disabled={isSubmitting}>Next</Button>
                            </div>
                        </Form>
                    </Card>
                </div>

                <div className="flex flex-col gap-4 2xl:min-w-[360px]">
                    <BalanceCard />
                    <DepositLimitCard />
                    <UserDetailsCard />
                </div>
            </div>
        </div>
    )
}

export default Withdraw