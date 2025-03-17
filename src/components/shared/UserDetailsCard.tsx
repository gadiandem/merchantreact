import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'

import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

interface IProfile {
    phone: string;
    status: string
}

const UserDetailsCard = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<IProfile | null>(null);

    const fetchData = async () => {
        try {
            const resp = await ApiService.fetchDataWithAxios<IProfile>({
                url: endpointConfig.getProfile,
                method: 'get'
            });

            setProfile(resp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('Error fetching profile: ', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log('Profile: ', profile);

    return (
        <Card bordered={false}
            className="">
            <h5>My Details</h5>

            {!loading && profile ? <div className="flex flex-col gap-5 mt-6">
                <div>
                    <span className="font-semibold heading-text">
                        Phone:
                    </span>
                    <span className="font-semibold">
                        {' '}
                        {profile?.phone}
                    </span>
                </div>

                <div>
                    <span className="font-semibold heading-text">
                        Account:
                    </span>
                    <span className="font-semibold capitalize">
                        {' '}
                        Merchant
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-semibold heading-text">
                        Status:
                    </span>
                    <Tag className="border-2 bg-transparent text-green-600 border-green-600 dark:bg-transparent dark:text-green-600 dark:border-green-600 rounded-full">
                        {profile.status}
                    </Tag>
                </div>
            </div> : null}
        </Card>
    )
}

export default UserDetailsCard