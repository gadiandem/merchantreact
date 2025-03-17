import type { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    id?: string
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type TraslationFn = (
    key: string,
    fallback?: string | Record<string, string | number>,
) => string

export type Option = {
    value: string | number
    label: string
}

export type TransactionFilterFormSchema = {
    dateFrom: Date,
    dateTo: Date,
    referenceNo?: string,
    transId?: string,
    transMode?: string,
    transType?: string,
    transStatus?: string,
    country?: string,
    paymentType?: string
}