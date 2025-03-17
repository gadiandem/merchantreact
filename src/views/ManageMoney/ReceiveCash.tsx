import Card from '@/components/ui/Card'
import ReceiveMoneyForm from '@/components/ReceiveMoneyForm'
import BalanceCard from "@/components/shared/BalanceCard"
import DepositLimitCard from "@/components/shared/DepositLimitCard"
import UserDetailsCard from "@/components/shared/UserDetailsCard"


const ReceiveCash = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4">
                <div className="flex flex-col gap-4 col-span-2">
                    <Card>
                        <h5>Send Money</h5>
                        <p>You can request a payment from anyone with an email address or mobile number even if they do not have a FloCash account.</p>

                        <ReceiveMoneyForm />
                    </Card>

                    <Card>
                        <h5>Quick Links</h5>
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

export default ReceiveCash