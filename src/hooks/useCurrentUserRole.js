import { useQuery } from "@tanstack/react-query";
import { useAuthInfo } from "../contexts/authProvider/AuthProvider";

const useCurrentUserRole = () => {
    const { user } = useAuthInfo();
    const uid = user?.uid || null;
    const { data } = useQuery({
        queryKey: ['currentUserRole', uid],
        queryFn: () => fetch(`https://ssf-news-server.vercel.app/user-role/${uid}`).then(res => res.json())
    });
    const role = data?.role;
    const isAdmin = (role === 'admin') ? true : false;
    const isModerator = (role === 'moderator') ? true : false;
    const isGeneralUser = !isAdmin && !isModerator;
    return { isAdmin, isModerator, isGeneralUser }
};

export default useCurrentUserRole;