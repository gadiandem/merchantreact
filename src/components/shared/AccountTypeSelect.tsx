import { Controller } from 'react-hook-form';
import Select from '@/components/ui/Select';
import useAccounts from '@/utils/hooks/useAccounts';

type Option = {
    value: string;
    label: string;
};


interface AccountTypeSelectProps {
    control: any;
    name: string;
    error?: string;
}

export default function AccountTypeSelect({ control, name, error }: AccountTypeSelectProps) {
    const { accounts, loading, error: apiError , refetch } = useAccounts();
    let accountTypeOptions: Option[] = [];

    if (accounts) {
        accountTypeOptions = accounts.map((account: any) => ({
            value: account.currency.name,
            label: account.currency.name,
        }));
    }
    
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    options={accountTypeOptions}
                    {...field}
                    value={accountTypeOptions.find(option => option.value === field.value)}
                    onChange={option => field.onChange(option?.value)}
                />
            )}
        />
    );
}
