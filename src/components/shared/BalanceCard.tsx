import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import useAccounts from '@/utils/hooks/useAccounts'

const BalanceCard = () => {
    const { accounts, loading, error, refetch } = useAccounts();

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <Card
            bordered={false}
            className="">
            <h5>Balance</h5>

            <div className='flex flex-col gap-5 mt-4'>

                {!loading && accounts.map((account: any, index: number) => (
                    <div key={index} className='flex items-center justify-between'>
                        <span className="font-bold capitalize">
                            {account.currency.name}
                        </span>
                        <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">{account.balance}</Tag>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default BalanceCard