import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import type { ZodType } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form';
import Radio from '@/components/ui/Radio';
import Upload from '@/components/ui/Upload';
import Button from '@/components/ui/Button';

type FormSchema = {
    accountType: string
    upload: File[]
}

const MAX_UPLOAD = 1

const validationSchema: ZodType<FormSchema> = z.object({
    accountType: z.string().min(1),
    upload: z.array(z.instanceof(File)).nonempty('A file must be included!'),
})

const BulkPayment = () => {
    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<FormSchema>({
        defaultValues: {
            accountType: '',
            upload: [],
        },
        resolver: zodResolver(validationSchema),
    })

    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 500000

        if (fileList.length >= MAX_UPLOAD) {
            return `You can only upload ${MAX_UPLOAD} file(s)`
        }

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

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
                        <h5>Bulk Payment - Upload Data File</h5>
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
                                            <Radio value={'card'}>Debit/Credit Cards - 1-2 Days</Radio>
                                            <Radio value={'bank'}>Bank Account - 1-5 Days</Radio>
                                            <Radio value={'mobile'}>Mobile Money - 1-2 Days</Radio>
                                            <Radio value={'internal'}>FloCash User - Instant</Radio>
                                        </Radio.Group>
                                    }
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Upload"
                                invalid={Boolean(errors.upload)}
                                errorMessage={errors.upload?.message}
                            >
                                <Controller
                                    name="upload"
                                    control={control}
                                    render={({ field }) =>
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            fileList={field.value}
                                            onFileRemove={(files) =>
                                                field.onChange(files)
                                            }
                                            onChange={(files) =>
                                                field.onChange(files)
                                            }
                                        />
                                    }
                                />
                            </FormItem>

                            <div className="inline-flex flex-wrap xl:flex gap-2">
                                <Button variant="solid" type='button' disabled={isSubmitting}>Submit</Button>
                            </div>
                        </Form>
                    </Card>
                </div>
                <div className="flex flex-col gap-4 2xl:min-w-[360px]">
                    <Card
                        bordered={false}
                        className="">
                        <h5>Download Template</h5>


                    </Card>
                </div>
            </div>
        </div>
    )
}

export default BulkPayment