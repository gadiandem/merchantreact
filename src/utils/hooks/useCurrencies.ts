import { useState, useEffect } from 'react';
import ApiService from '@/services/ApiService';
import endpointConfig from '@/configs/endpoint.config';

export default function useCurrencies() {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const resp = await ApiService.fetchDataWithAxios<any>({
                url: endpointConfig.getCurrencies,
                method: 'get'
            });
            setCurrencies(resp);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch currencies');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { currencies, loading, error, refetch: fetchData };
}
