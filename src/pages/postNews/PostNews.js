import React from 'react';
import useCategories from '../../hooks/useCategories';
import CircleLoading from '../../components/loading/CircleLoading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthInfo } from '../../contexts/authProvider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostNews = () => {
    const navigate = useNavigate();
    const { categories, isLoading } = useCategories();
    const { user } = useAuthInfo();
    const uid = user?.uid;
    const userName = user?.displayName;
    const userImg = user?.photoURL;
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (news) => fetch('https://ssf-news-server.vercel.app/post-news', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(news)
        }).then(res => res.json()),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            if (data.insertedId) {
                toast.success(`News posted successfully by ${user.displayName}`);
                navigate(`/categories/${data.categoryId}}`);
            }
            else {
                toast.error('Failed to post that news');
            }
        }
    });

    const handlePost = (event) => {
        event.preventDefault();
        const form = event.target;
        const categoryId = parseInt(form.categoryId.value);
        const newsTitle = form.newsTitle.value;
        const newsBody = form.newsBody.value;
        let data = new FormData();
        data.append('image', form.newsImg.files[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_UPLOAD_KEY}`, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                const { url } = data.data;
                mutate({ userId: uid, userName, userImg, categoryId, newsImg: url, newsTitle, newsBody, date: new Date().getTime() });
            })
    }

    if (isLoading) {
        return <CircleLoading />
    }
    return (
        <div className="hero bg-base-100">
            <div className="hero-content w-full">
                <div className="card shadow-2xl bg-base-100 w-full">
                    <form className="card-body" onSubmit={handlePost}>
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
                            <input type="text" placeholder="News Title" name='newsTitle' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">News Body</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-24" name='newsBody' placeholder="News Body"></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pick a file</span>
                                <span className="label-text-alt">Alt label</span>
                            </label>
                            <input type="file" className="file-input file-input-bordered w-full" name='newsImg' />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Post Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostNews;