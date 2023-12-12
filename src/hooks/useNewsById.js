import { useQuery } from "@tanstack/react-query";

const useNewsById = (id) => {
    const { data: newsDetails } = useQuery({
        queryKey: ['newsDetails', id],
        queryFn: () => fetch(`https://ssf-news-server.vercel.app/news-details/${id}`).then(res => res.json())
    });
    return { newsDetails }
};

export default useNewsById;