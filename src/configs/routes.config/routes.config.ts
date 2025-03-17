import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Dashboard')),
        authority: [],
    },

    {
        key: 'manageMoney.sendCash',
        path: '/send-cash-opt',
        component: lazy(() => import('@/views/ManageMoney/SendMoney')),
        authority: [],
    },
    {
        key: 'manageMoney.bulkPayment',
        path: '/send-cash/bulk-payment',
        component: lazy(() => import('@/views/ManageMoney/BulkPayment')),
        authority: [],
    },
    {
        key: 'manageMoney.depositFund',
        path: '/deposit-fund',
        component: lazy(() => import('@/views/ManageMoney/DepositFund')),
        authority: [],
    },
    {
        key: 'manageMoney.receiveCash',
        path: '/init-request-cash',
        component: lazy(() => import('@/views/ManageMoney/ReceiveCash')),
        authority: [],
    },
    {
        key: 'manageMoney.withdraw',
        path: '/init-withdraw',
        component: lazy(() => import('@/views/ManageMoney/Withdraw')),
        authority: [],
    },
    {
        key: 'transaction.completed',
        path: '/transactions/completed',
        component: lazy(() => import('@/views/Transactions/Completed')),
        authority: [],
    },
    
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
