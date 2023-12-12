import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useDeleteNews = (_id, categoryId) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: () => fetch(`https://ssf-news-server.vercel.app/delete-news/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json()),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            if (data.deletedCount) {
                toast.success('News Deleted Successfully');
                if (!categoryId) {
                    navigate('/categories/0');
                }
                else {
                    navigate(`/categories/${categoryId}`);
                }
            }
            else {
                toast.error('failed to delete this news');
            }
        }
    });

    return { mutate }
};

export default useDeleteNews;