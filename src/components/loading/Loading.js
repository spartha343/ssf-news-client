import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className='flex items-center justify-center min-h-[70vh]'>
            <ClimbingBoxLoader color="#36d7b7" size={18}></ClimbingBoxLoader>
        </div>
    );
};

export default Loading;