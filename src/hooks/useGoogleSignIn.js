import { toast } from "react-toastify";
import { useAuthInfo } from "../contexts/authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const useGoogleSignIn = () => {
    const navigate = useNavigate();
    const { signInUsingGoogle } = useAuthInfo();
    const handleSignInWithGoogle = () => {
        signInUsingGoogle()
            .then(result => {
                toast.success(`Successfully signed in as ${result.user.email}`);
                navigate('/');
            })
            .catch(error => {
                toast.error(`Error ${error.code}: ${error.message}`);
            })
    }
    return handleSignInWithGoogle;
};

export default useGoogleSignIn;