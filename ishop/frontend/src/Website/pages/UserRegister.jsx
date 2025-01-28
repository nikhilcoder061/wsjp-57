import React, { useContext, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MainContext } from '../../Context/Context';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/UserSlice';
import axios from 'axios';

export default function UserRegister() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(false);
    const { toastNotify, API_BASE_URL } = useContext(MainContext);
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const registerUser = (event) => {
        event.preventDefault();
        setError(false);

        if (event.target.password.value != event.target.confirm_password.value) {
            setError(true);
        } else {
            const data = {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value
            }

            axios.post(API_BASE_URL + '/user/create', data).then(
                (success) => {
                    console.log(success);
                    toastNotify(success.data.msg, success.data.status);
                    if (success.data.status == 1) {
                        dispatch(login(
                            {
                                data: success.data.user,
                                token: success.data.token
                            }
                        ))
                        if (searchParams.get('ref') == 'cart') {
                            navigate('/cart');
                        } else {
                            navigate('/');
                        }
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                    toastNotify(error.data.msg, error.data.status);
                }
            )
        }


    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
                    Create an Account
                </h2>
                <form onSubmit={registerUser}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm_password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    {
                        error ? <div className='text-red-500 mb-4'>Passoword not Match</div> : ''
                    }
                    {/* <div className='text-red-500 hidden'>Passoword not Match</div> */}
                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to={`/login?${searchParams.toString()}`}>
                        <span href="#" className="text-blue-600 hover:underline">
                            Login here
                        </span>
                    </Link>
                </p>
            </div>
        </div>


    )
}
