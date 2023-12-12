import React from 'react';
import { BsGoogle } from 'react-icons/bs'
import { useAuthInfo } from '../../../contexts/authProvider/AuthProvider';
import useGoogleSignIn from '../../../hooks/useGoogleSignIn';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { signUpUsingEmail } = useAuthInfo();
    const handleSignInWithGoogle = useGoogleSignIn();

    const handleSignUpWithEmail = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signUpUsingEmail(email, password)
            .then((result) => {
                const user = result.user;
                toast.success(`Successfully signed up as ${user.email}`);
            })
            .catch(error => {
                toast.error(`Error ${error.code}: ${error.message}`);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    <form className="card-body pb-3" onSubmit={event => handleSignUpWithEmail(event)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <p className="label-text-alt">Already Have an account? <Link to='/sign-in' className='link link-hover'>Sign In</Link> </p>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <input type="submit" value="Sign Up" className='btn btn-primary' />
                        </div>
                    </form>

                    <div className="divider my-1 w-10/12 mx-auto"></div>

                    <button onClick={handleSignInWithGoogle} className="btn btn-outline w-10/12 mx-auto mb-6"><BsGoogle size={18} /> Sign In With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;