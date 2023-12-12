import { useQuery } from '@tanstack/react-query';

const useNewsByCategory = (id) => {
    const { data: newsByCategory, isLoading, isFetching } = useQuery({
        queryKey: ['news', id],
        queryFn: () => fetch(`https://ssf-news-server.vercel.app/categories/${id}`).then(res => res.json()),
    });

    return { newsByCategory, isLoading, isFetching };
};

export default useNewsByCategory;