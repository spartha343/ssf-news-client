import React from 'react';
import { useAuthInfo } from '../../contexts/authProvider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { signOutFromApp } = useAuthInfo();
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOutFromApp()
            .then(() => {
                // Sign Out SuccessFully
                toast.success('Signed Out Successfully')
                navigate('/');
            })
            .catch(error => {
                toast.error('Opps, there was an error while signing out');
                console.log(error)
            })
    }
    return (
        <div>
            This is the user Profile Component
            <button onClick={handleSignOut} className='btn btn-primary'>Sign Out</button>
        </div>
    );
};

export default UserProfile;