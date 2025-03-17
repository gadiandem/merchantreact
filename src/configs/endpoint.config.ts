export const apiPrefix = '/api'

const endpointConfig = {
    // signIn: '/sign-in',
    signIn: '/oauth2/token',
    signOut: '/sign-out',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    getAccounts: '/api/users/accounts',
    getProfile: '/api/users/profile',
    getCurrencies: '/api/currencies',
    searchTransactions: '/api/transaction/search',
    exportTransactions: '/api/transaction/export',
    getExportTransactionHeaders: '/api/transaction/export-headers',
    getTransactionDetails: '/api/transaction/ecom-details',
    getPaymentPartners: '/api/payment-partners',
    chartsTransactions: '/api/charts/txncount',
    chartsOrderStatus: '/api/charts/order-status',
    chartsRefundTypes: '/api/charts/refund-chart',
    chartsRevenue: '/api/charts/revenue-chart'
}

export default endpointConfig
