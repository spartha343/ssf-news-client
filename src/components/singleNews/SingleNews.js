import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { GrDocumentUpdate } from 'react-icons/gr';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import useCurrentUserRole from '../../hooks/useCurrentUserRole';
import useDeleteNews from '../../hooks/useDeleteNews';

const SingleNews = ({ singleNews }) => {
    const { isGeneralUser } = useCurrentUserRole();
    const { _id, newsImg, newsTitle, newsBody, categoryId } = singleNews;
    const { mutate } = useDeleteNews(_id, categoryId);

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img className='h-56 w-full' src={newsImg} alt={newsTitle} /></figure>
            <div className="card-body">
                <h2 className="card-title">{newsTitle}</h2>
                <p>{newsBody.slice(0, 110) + '...'}</p>
                <div className="card-actions justify-end">
                    <Link to={`/news-details/${_id}`}>
                        <button className="btn btn-primary btn-sm">Details <IoMdArrowForward size={18} /></button>
                    </Link>
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
    );
};

export default SingleNews;