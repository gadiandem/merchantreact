import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'

import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'

import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

const DashboardRevenueChart = ({
    title = 'Last 7 Days Revenue',
}: {
    title: string
}) => {
    const [loading, setLoading] = useState(true)
    const [revenue, setRevenue] = useState<{ currency: string; amount: number }[]>([])

    const startDate = subDays(new Date(), 7) // Get the last 7 days (including today)
    const endDate = new Date()

    const fetchData = async () => {
        setLoading(true)
        try {
            const resp = await ApiService.fetchDataWithAxios({
                url: endpointConfig.chartsRevenue,
                method: 'post',
                data: {
                    fromDate: format(startDate, 'dd/MM/yyyy'),
                    toDate: format(endDate, 'dd/MM/yyyy')
                }
            })

            const responseData = Array.isArray(resp) ? resp : []
            setRevenue(responseData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching chart data: ', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Card>
            <h5 className="mb-4">{title}</h5>

            <div className="flex flex-col gap-4">
                {!loading && revenue.length > 0 ? (
                    <>
                        {revenue.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-600 font-bold heading-text flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <div className="heading-text">{item.currency}</div>
                                </div>
                                <div className="border-dashed border-[1.5px] border-gray-300 dark:border-gray-500 flex-1" />
                                <div>
                                    <span
                                        className={classNames(
                                            'rounded-full px-2 py-1 text-white',
                                            item.amount > 0 && 'bg-success',
                                            item.amount <= 0 &&
                                            'bg-warning',
                                        )}
                                    >
                                        {item.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Card>
    )
}

export default DashboardRevenueChart