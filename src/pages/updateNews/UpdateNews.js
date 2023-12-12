import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useNewsById from '../../hooks/useNewsById';
import useCategories from '../../hooks/useCategories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthInfo } from '../../contexts/authProvider/AuthProvider';
import { toast } from 'react-toastify';

const UpdateNews = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthInfo();
    const { newsDetails } = useNewsById(id);
    const { categories } = useCategories();
    const { newsTitle, newsBody } = newsDetails || {};
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (updatedNews) => fetch(`https://ssf-news-server.vercel.app/update-news/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedNews)
        }).then(res => res.json()),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            if (data.modifiedCount) {
                console.log(data);
                toast.success(`News Updated successfully by ${user.displayName}`);
                navigate(`/categories/${data.categoryId}}`);
            }
            else {
                toast.error('Failed to update this news');
            }
        }
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const categoryId = parseInt(form.categoryId.value);
        const newsTitle = form.newsTitle.value;
        const newsBody = form.newsBody.value;
        let data = new FormData();
        data.append('image', form.newsImg.files[0]);
        // Take the api key as an environment variable
        fetch(`https://api.imgbb.com/1/upload?key=13c468ac53617dc5d97826b89f00e88c`, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(async (data) => {
                const { url } = data.data;
                await mutateAsync({ categoryId, newsTitle, newsBody, newsImg: url });
            })
    }

    return (
        <div className="hero bg-base-100">
            <div className="hero-content w-full">
                <div className="card shadow-2xl bg-base-100 w-full">
                    <form className="card-body" onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pick the News Category</span>
                            </label>
                            <select name='categoryId' className="select select-bordered">
                                {
                                    categories?.map(category => <option key={category._id} value={category.categoryId}>{category.categoryName}</option>)
                                }
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">News Title</span>
                            </label>
                            <input type="text" placeholder="News Title" name='newsTitle' defaultValue={newsTitle} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">News Body</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-24" name='newsBody' defaultValue={newsBody} placeholder="News Body"></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pick a file</span>
                                <span className="label-text-alt">Alt label</span>
                            </label>
                            <input type="file" name='newsImg' className="file-input file-input-bordered w-full" />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateNews;