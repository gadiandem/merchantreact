import { useState } from "react";
import { subDays } from "date-fns";
import { TransactionFilterFormSchema } from "@/@types/common";
import TransactionsFilters from "@/components/Transactions/TransactionsFilters";
import TransactionsTable from "@/components/Transactions/TransactionsTable";

const defaultValues: TransactionFilterFormSchema = {
    dateFrom: subDays(new Date(), 7),
    dateTo: new Date(),
    referenceNo: '',
    transId: '',
    transMode: '',
    transType: 'ALL',
    transStatus: 'ALL',
    paymentType: 'ALL',
    country: 'ALL',
}

const CompletedTransactions = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState<TransactionFilterFormSchema>(defaultValues);
    const [filteredData, setFilteredData] = useState(null);

    return (
        <div className="flex flex-col gap-4">
            <TransactionsFilters
                filters={filters}
                setLoading={setLoading}
                setFilters={setFilters}
                onFilter={setFilteredData}
                page={page}
                // key={page}
            />
            <TransactionsTable loading={loading} onPaginate={setPage} transactions={filteredData} />
        </div>
    );
};

export default CompletedTransactions;
