import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import Radio from '@/components/ui/Radio'
import Button from '@/components/ui/Button'

import InternalForm from "./InternalForm";
import BankForm from './BankForm';
import CardForm from './CardForm';
import MobileForm from './MobileForm';

export default function SendMoneyForm() {
    const [step, setStep] = useState(1);
    const [transactionType, setTransactionType] = useState('')

    const onChange = (val: string) => {
        setTransactionType(val)
    }

    return (
        <div className='mt-4'>
            {step === 1 && (
                <section className='grid grid-cols-1 gap-4'>
                    <Radio.Group vertical value={transactionType} onChange={onChange}>
                        <Radio value={'card'}>Debit/Credit Cards - 1-2 Days</Radio>
                        <Radio value={'bank'}>Bank Account - 1-5 Days</Radio>
                        <Radio value={'mobile'}>Mobile Money - 1-2 Days</Radio>
                        <Radio value={'internal'}>FloCash User - Instant</Radio>
                    </Radio.Group>

                    <div className="inline-flex flex-wrap xl:flex mt-4 gap-2">
                        <Button variant="solid" type='button' disabled={transactionType === ''} onClick={() => setStep(2)}>Next</Button>
                        {/* <Button>Cancel</Button> */}
                    </div>
                </section>
            )}

            {step === 2 && (<section className="step2">
                <div id='step2_card'>
                    {transactionType === 'internal' && <InternalForm onCancel={() => setStep(1)} />}
                    {transactionType === 'card' && <CardForm onCancel={() => setStep(1)} />}
                    {transactionType === 'bank' && <BankForm onCancel={() => setStep(1)} />}
                    {transactionType === 'mobile' && <MobileForm onCancel={() => setStep(1)} />}
                </div>
            </section>)}
        </div>
    )
}