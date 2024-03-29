import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Loading from '../Loading';

const Login = () => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState("");
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)


    /* use context API to store user information */

    const onSubmit = async data => {
        // console.log(data);
        const email = data.email;
        // console.log(email);
        setIsLoading(true);
        fetch(`https://outshado.herokuapp.com/login/${email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(serverData => {
                // console.log('user data', serverData);
                console.log(serverData);
                if (serverData?.email) {
                    if (serverData?.password === data.password) {
                        console.log("password matched");
                        setUser(data);
                        setIsLoading(false);

                    } else {
                        setLoginError('password is not match please retry');
                        setIsLoading(false);
                    }
                } else {
                    // console.log('failed');
                    setLoginError('Email/user is not regiester yet');
                    setIsLoading(false);
                }
            })
    }

    if (user) { 
        navigate('/dashboard');
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <>
            <div className="h-screen">
                <h1 className='text-3xl font-bold text-red-500 text-center mt-20 mb-10'>Outshade Digital Media Job tasks</h1>
                <div className='flex justify-center items-center'>
                    <div className="card w-96 bg-base-100 shadow-xl p-5">
                        <div className="card-body">
                            <h2 className="text-center text-2xl font-bold text-red-500">Login</h2>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: 'Enter Vaild Email Address'
                                            }
                                        })}
                                    />

                                    <label className="label">
                                        {errors.email?.type === 'required' && <span
                                            className="label-text-alt text-red-500">
                                            {errors.email.message}
                                        </span>}
                                        {errors.email?.type === 'pattern' && <span
                                            className="label-text-alt text-red-500">
                                            {errors.email.message}
                                        </span>}

                                    </label>
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">password</span>
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        className="input input-bordered w-full max-w-xs"
                                        autoComplete='off'
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password is Required'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Must be 6 characters or longer'
                                            }
                                        })}
                                    />

                                    <label className="label">
                                        {errors.password?.type === 'required' && <span
                                            className="label-text-alt text-red-500">
                                            {errors.password.message}
                                        </span>}
                                        {errors.password?.type === 'minLength' && <span
                                            className="label-text-alt text-red-500">
                                            {errors.password.message}
                                        </span>}

                                    </label>
                                </div>

                                <p className='text-red-500 my-2'>{loginError}</p>

                                <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
                            </form>
                            <p><small>New to here? <Link to='/signin' className='text-red-500'>Create New Account</Link></small></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;