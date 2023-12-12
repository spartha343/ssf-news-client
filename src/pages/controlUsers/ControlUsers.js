import { useQuery } from '@tanstack/react-query';
import React from 'react';
import User from '../../components/user/User';
import Loading from '../../components/loading/Loading';

const ControlUsers = () => {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://ssf-news-server.vercel.app/users').then(res => res.json())
    });
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                    <tr>
                        <th><label>#</label></th>
                        <th>Users Informations</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, idx) => <User key={user._id} user={user} idx={idx} />)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ControlUsers;