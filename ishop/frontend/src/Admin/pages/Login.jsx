import React, { useContext } from 'react'
import { MainContext } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/AdminSlice';

export default function Login() {

    const { toastNotify, API_BASE_URL } = useContext(MainContext);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const adminLogin = (event) => {

        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post(API_BASE_URL + '/admin/login', data).then(
            (success) => {
                toastNotify(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    dispatch(login(
                        {
                            data: success.data.admin,
                            token: success.data.token
                        }
                    ))
                    navigate('/admin');
                }
            }
        ).catch(
            (error) => {
                toastNotify(error.data.msg, error.data.status);
            }
        )

    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-lg bg-white border p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form action="#" method="POST" onSubmit={adminLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                        <a href="#" className="text-blue-500 text-sm hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>

    )
}
