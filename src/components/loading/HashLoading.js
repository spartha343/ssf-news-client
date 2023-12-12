import React from 'react';
import { HashLoader } from 'react-spinners';

const HashLoading = () => {
    return (
        <div className='flex justify-center items-center min-w-full min-h-[100vh]'>
            <HashLoader color="#36d7b7" />
        </div>
    );
};

export default HashLoading;