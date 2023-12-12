import React from 'react';
import { CircleLoader } from 'react-spinners';

const CircleLoading = () => {
    return (
        <div className='flex justify-center items-center min-h-[85vh]'>
            <CircleLoader color="#36d7b7" />
        </div>
    );
};

export default CircleLoading;