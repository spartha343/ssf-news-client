import React from 'react';
import useCurrentUserRole from '../../hooks/useCurrentUserRole';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const User = ({ user, idx }) => {
    const { userImg, userName, userEmail, role, userId } = user;
    const queryClient = useQueryClient();
    const admin = role === 'admin' ? true : false;
    const moderator = role === 'moderator' ? true : false;
    const { isAdmin } = useCurrentUserRole();
    const { data, mutateAsync } = useMutation({
        mutationFn: ({ userId, newRole }) => fetch(`https://ssf-news-server.vercel.app/user-role/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ newRole })
        }).then(res => res.json()),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    });

    const setRole = async (newRole) => {
        if (isAdmin) {
            await mutateAsync({ userId, newRole });
            if (data?.modifiedCount) {
                console.log('Successfully modified');
                toast.success(`Role is set as ${newRole !== '' ? newRole : null}`);
            }
            else {
                toast.error('There was an error while changing user role');
            }
        }
    }

    return (
        <tr>
            <th><label>{idx + 1}</label></th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={userImg} alt={userName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{userName}</div>
                        <div className="text-sm opacity-50">{userEmail}</div>
                    </div>
                </div>
            </td>
            <td>
                <button onClick={() => setRole('admin')} className={`btn btn-sm mr-2 btn-success ${admin && 'btn-disabled'}`}>Make Admin</button>
                <button onClick={() => setRole('moderator')} className={`btn btn-sm mr-2 my-2 btn-accent ${moderator && 'btn-disabled'}`}>Make Moderator</button>
                <button onClick={() => setRole('')} className={`btn btn-sm mr-2 btn-info ${!admin && !moderator && 'btn-disabled'}`}>Set Null</button>
            </td>
        </tr>
    );
};

export default User;