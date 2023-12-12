import React from 'react';
import { BounceLoader } from 'react-spinners';

const BounceLoading = () => {
    return (
        <div className='flex justify-center items-center min-h-[50vh] w-full lg:w-1/3'>
            <BounceLoader color="#36d7b7" />
        </div>
    );
};

export default BounceLoading;