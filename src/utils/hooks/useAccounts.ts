import { useState, useEffect } from 'react';
import ApiService from '@/services/ApiService';
import endpointConfig from '@/configs/endpoint.config';

export default function useAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.getAccounts,
                method: 'get'
            });
            setAccounts(resp);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch accounts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { accounts, loading, error, refetch: fetchData };
}
