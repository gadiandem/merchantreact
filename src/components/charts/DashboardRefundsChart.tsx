import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import { AiOutlineSync, AiOutlineFileDone } from "react-icons/ai";

import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'

import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

const DashboardRefundsChart = ({
    title = 'Open refunds, charge-backs, pending settlements',
}: {
    title: string
}) => {
    const [loading, setLoading] = useState(true)
    const [refunds, setRefunds] = useState<any>(null);
    const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([])
    const [labels, setLabels] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])

    const startDate = subDays(new Date(), 7) // Get the last 7 days (including today)
    const endDate = new Date()

    const fetchData = async () => {
        setLoading(true)
        try {
            const resp = await ApiService.fetchDataWithAxios({
                url: endpointConfig.chartsRefundTypes,
                method: 'post',
                data: {
                    fromDate: format(startDate, 'dd/MM/yyyy'),
                    toDate: format(endDate, 'dd/MM/yyyy')
                }
            })

            const responseData = Array.isArray(resp) ? resp : []
            const dataSeries = responseData.map(item => item.total)
            const dataLabels = responseData.map(item => item.status)
            const dataColors = responseData.map(item => item.color)

            setRefunds(responseData)
            setChartData(dataSeries)
            setLabels(dataLabels)
            setColors(dataColors)
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
            <h5>{title}</h5>

            <div className="mt-4">
                {!loading && chartData.length > 0 ? (
                    <>
                        <Chart
                            height={300}
                            series={chartData}
                            customOptions={{
                                colors: colors,
                                labels: labels,
                                plotOptions: {
                                    pie: {
                                        donut: {
                                            labels: {
                                                show: true,
                                                total: {
                                                    show: true,
                                                    showAlways: true,
                                                    label: '',
                                                    formatter: function () {
                                                        return ''
                                                    },
                                                },
                                            },
                                            size: '75%',
                                        },
                                    },
                                }
                            }}
                            type="donut"
                        />

                        {refunds && refunds.length ? <div className="mt-6 flex justify-center gap-12 mx-auto">
                            {refunds.length > 0 ? <div className="flex flex-col items-center justify-center gap-2">
                                <div className="text-3xl" style={{ color: refunds[0].color }}>
                                    {refunds[0].status === 'Processed' ? <AiOutlineFileDone /> : <AiOutlineSync />}
                                </div>
                                <div className="text-center">
                                    <span>{refunds[0].status}</span>
                                    <h5>{refunds[0].total}</h5>
                                </div>
                            </div> : null}

                            {refunds.length > 1 ? <div className="flex flex-col items-center justify-center gap-2">
                                <div className="text-3xl" style={{ color: refunds[1].color }}>
                                    {refunds[1].status === 'Processed' ? <AiOutlineFileDone /> : <AiOutlineSync />}
                                </div>
                                <div className="text-center">
                                    <span>{refunds[1].status}</span>
                                    <h5>{refunds[1].total}</h5>
                                </div>
                            </div> : null}
                        </div> : null}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Card>
    )
}

export default DashboardRefundsChart