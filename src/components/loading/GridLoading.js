import React from 'react';
import { GridLoader } from 'react-spinners';

const GridLoading = () => {
    return (
        <div className='flex justify-center items-center min-h-[50vh]'>
            <GridLoader color="#36d7b7" />
        </div>
    );
};

export default GridLoading;