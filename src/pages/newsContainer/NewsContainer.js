import React from 'react';
import { useParams } from 'react-router-dom';
import SingleNews from '../../components/singleNews/SingleNews';
import useNewsByCategory from '../../hooks/useNewsByCategory';
import Loading from '../../components/loading/Loading';

const NewsContainer = () => {

    let { id } = useParams();
    if (!id) {
        id = 0;
    }

    const { newsByCategory, isLoading } = useNewsByCategory(id);
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            {/* Search Bar */}
            {/* TODO: Implement the code of search bar */}
            <div className='mt-4'>
                <form onSubmit={() => { }} className='flex justify-center'>
                    <input type="text" name='searchedText' placeholder="Search a News" className="input input-bordered input-ghost w-full max-w-xs" />
                    <input type="submit" value='Search' className='btn ml-3' />
                </form>
            </div>

            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 my-7'>
                {
                    newsByCategory?.map(singleNews => <SingleNews key={singleNews._id} singleNews={singleNews} />)
                }
            </div>
        </>
    );
};

export default NewsContainer;