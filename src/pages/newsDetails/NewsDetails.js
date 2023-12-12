import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { GrDocumentUpdate } from 'react-icons/gr';
import SingleNews from '../../components/singleNews/SingleNews';
import useNewsByCategory from '../../hooks/useNewsByCategory';
import Loading from '../../components/loading/Loading';
import GridLoading from '../../components/loading/GridLoading';
import BounceLoading from '../../components/loading/BounceLoading';
import useNewsById from '../../hooks/useNewsById';
import useCurrentUserRole from '../../hooks/useCurrentUserRole';
import useDeleteNews from '../../hooks/useDeleteNews';

const NewsDetails = () => {
    const { isGeneralUser } = useCurrentUserRole();
    const navigate = useNavigate();
    const { id } = useParams();
    const { newsDetails } = useNewsById(id);
    const { _id, newsImg, newsTitle, newsBody, userId, categoryId } = newsDetails || {};
    const { mutate } = useDeleteNews(_id, categoryId)

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])


    const { data: newsBySameAuthor } = useQuery({
        queryKey: ['newsBySameAuthor', userId],
        queryFn: () => fetch(`https://ssf-news-server.vercel.app/news-by-same-author/${userId}`).then(res => res.json()),
        enabled: !!userId
    });

    const { newsByCategory, isLoading } = useNewsByCategory(categoryId);
    const similarNews = newsByCategory?.filter(news => news._id !== id)

    return (
        <div className='mx-3'>
            <div className='lg:flex'>
                {/* News details section  */}
                <div className="card bg-base-100 shadow-xl w-full lg:w-2/3 my-3 mx-auto">
                    {!_id && <GridLoading />}
                    <figure className="px-10 pt-10">
                        <img src={newsImg} alt={newsTitle} className="rounded-xl max-h-96 w-11/12" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{newsTitle}</h2>
                        <p>{newsBody}</p>
                        <div className="card-actions">
                            <button onClick={() => navigate(-1)} className="btn btn-primary btn-sm"><IoMdArrowBack size={18} /> Go Back</button>
                            {
                                !isGeneralUser && <>
                                    <Link to={`/dashboard/update-news/${_id}`}>
                                        <button className="btn btn-warning btn-sm">Update <GrDocumentUpdate /></button>
                                    </Link>
                                    <button onClick={mutate} className="btn btn-error btn-sm">Delete <RiDeleteBin2Fill size={18} /></button>
                                </>
                            }
                        </div>
                    </div>
                </div>

                {/* News By same Author  */}
                {!newsBySameAuthor && <BounceLoading />}
                {
                    newsBySameAuthor?.length > 1 &&
                    <>
                        <div className='w-full lg:w-1/3 ml-3'>
                            <h3 className='text-xl my-3'>News by Same Author</h3>
                            {newsBySameAuthor?.filter(n => n._id !== _id).map(news => <div key={news._id} className="card bg-base-100 shadow-xl flex flex-row mb-2">
                                <div className='w-1/5'>
                                    <img className='h-20 w-24 rounded-lg' src={news.newsImg} alt={news.newsTitle} />
                                </div>
                                <div className="card-body p-2 w-4/5">
                                    <h2 className="card-title">{news.newsTitle}</h2>
                                    <p>{news.newsBody.slice(0, 30) + '...'}</p>
                                </div>
                            </div>)}
                        </div>
                    </>
                }
            </div>

            {/* Similar News Section  */}
            {isLoading && <Loading />}
            {
                similarNews?.length > 0 &&
                <div className='my-7'>
                    <h3 className='text-xl mb-3 text-center'>More Similar News</h3>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {
                            similarNews?.map(singleNews => <SingleNews key={singleNews._id} singleNews={singleNews} />)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default NewsDetails;