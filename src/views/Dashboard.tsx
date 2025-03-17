import Card from '@/components/ui/Card'
import Chart from 'react-apexcharts'

import DashboardChart from '@/components/charts/DashboardChart'
import DashboardRefundsChart from '@/components/charts/DashboardRefundsChart'
import DashboardRevenueChart from '@/components/charts/DashboardRevenueChart'

const Dashboard = () => {
    return (
        <div className='container'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardChart title='Successfull Transactions' type={null} color='green' chartType='bar' />

                <DashboardChart title='Declined Transactions' type='declined' color='red' chartType='bar' />

                <DashboardChart title='Expired Transactions' type='expired' color='orange' chartType='bar' />

                <DashboardChart title='Cancelled Transactions' type='cancelled' color='yellow' chartType='bar' />

                <DashboardRefundsChart title='Open refuds, charge-backs, pending settlements' />

                <DashboardRevenueChart title='Last 7 Days Revenue' />
            </div>
        </div>
    )
}

export default Dashboard
