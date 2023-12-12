import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`https://ssf-news-server.vercel.app/categories`).then(res => res.json())
    });
    return { categories, isLoading };
};

export default useCategories;