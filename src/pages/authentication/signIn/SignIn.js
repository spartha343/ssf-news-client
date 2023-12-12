import React from 'react';
import { BsGoogle } from 'react-icons/bs'
import useGoogleSignIn from '../../../hooks/useGoogleSignIn';
import { useAuthInfo } from '../../../contexts/authProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate();
    const { signInUsingEmail } = useAuthInfo();
    const handleSignInWithGoogle = useGoogleSignIn();
    const handleSignInWithEmail = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUsingEmail(email, password)
            .then(result => {
                toast.success('Signed In Successfully');
                navigate('/');
            })
    }

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign In now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    <form className="card-body pb-3" onSubmit={event => handleSignInWithEmail(event)}>
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
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <label className="label">
                                <p className="label-text-alt">Don't Have an account? <Link to='/sign-up' className='link link-hover'>Sign Up</Link> </p>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <input type="submit" value="Sign In" className='btn btn-primary' />
                        </div>
                    </form>

                    <div className="divider my-1 w-10/12 mx-auto"></div>

                    <button onClick={handleSignInWithGoogle} className="btn btn-outline w-10/12 mx-auto mb-6"><BsGoogle size={18} /> Sign In With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;