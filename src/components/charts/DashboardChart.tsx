import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'

import Card from '@/components/ui/Card'
import Chart from 'react-apexcharts'

import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

type ApexChartType = "line" | "area" | "bar" | "pie" | "donut" |
    "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" |
    "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";

export default function DashboardChart({
    title = 'Successful Transactions',
    type = 'successful',
    color = '#cccccc',
    chartType = 'line'
}: {
    title: string,
    type: string | null,
    color: string,
    chartType: ApexChartType
}) {
    const [loading, setLoading] = useState(true)
    // const [chartData, setChartData] = useState([{ name: 'Transactions', data: [] }])
    const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const startDate = subDays(new Date(), 7) // Get the last 7 days (including today)
    const endDate = new Date()

    const fetchData = async () => {
        setLoading(true)
        try {
            const resp = await ApiService.fetchDataWithAxios({
                url: type === null ? endpointConfig.chartsTransactions : endpointConfig.chartsOrderStatus,
                method: 'post',
                data: {
                    fromDate: format(startDate, 'dd/MM/yyyy'),
                    toDate: format(endDate, 'dd/MM/yyyy'),
                    chartType: type
                }
            })

            const responseData = Array.isArray(resp) ? resp : []
            const responseMap = responseData.reduce((acc: Record<string, number>, item: any) => {
                acc[item.postDate] = item.count
                return acc
            }, {})

            const last7Days = Array.from({ length: 7 }, (_, i) =>
                format(subDays(endDate, 6 - i), 'dd/MM/yyyy')
            )

            const finalData = last7Days.map(date => responseMap[date] || 0)
            setCategories(last7Days)
            setChartData([{ name: 'Transactions', data: finalData }])
        } catch (error) {
            console.error('Error fetching chart data: ', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    let options: any = {
        chart: {
            type: chartType,
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        colors: [color],
        xaxis: { categories },
        plotOptions: {},
    };
    
    if (chartType === 'line') {
        options.stroke = { curve: 'smooth', width: 3 };
    }
    
    if (chartType === 'bar') {
        options.plotOptions = {
            bar: { horizontal: false, columnWidth: '55%', borderRadius: 0 }
        };
    }
    
    if (chartType === 'bar') {
        options.fill = { opacity: 1 };
    }
    
    // Optional tooltip
    // options.tooltip = {
    //     y: { formatter: (val) => `$${val} thousands` },
    // };
    
    return (
        <Card>
            <h5 className="mb-4">{title}</h5>
    
            {!loading && chartData.length > 0 ? (
                <Chart options={options} series={chartData} height={300} type={chartType} />
            ) : (
                <p>Loading...</p>
            )}
        </Card>
    );
}
