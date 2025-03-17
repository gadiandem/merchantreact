import Card from '@/components/ui/Card';
import SendMoneyForm from '@/components/SendMoneyForm';
import BalanceCard from "@/components/shared/BalanceCard";
import DepositLimitCard from "@/components/shared/DepositLimitCard";
import UserDetailsCard from "@/components/shared/UserDetailsCard";

const SendMoney = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4">
                <div className="col-span-2">
                    <Card>
                        <h5>Send Money</h5>

                        <SendMoneyForm />
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

export default SendMoney