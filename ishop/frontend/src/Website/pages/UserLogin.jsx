import React, { useContext } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MainContext } from '../../Context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducer/UserSlice';
import axios from 'axios';
import { dbToCart } from '../../redux/reducer/CartSlice';

export default function UserLogin() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { toastNotify, API_BASE_URL } = useContext(MainContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.data);

    const loginUser = (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post(API_BASE_URL + '/user/login', data).then(
            (success) => {
                toastNotify(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    dispatch(login(
                        {
                            data: success.data.user,
                            token: success.data.token
                        }
                    ))

                    axios.post(API_BASE_URL + `/user/move-to-cart/${success.data.user._id}`, { cart }).then(
                        (success) => {
                            const latestCart = success.data.latestCart

                            let totalOriginalPrice = 0;
                            let totalFinalPrice = 0;

                            const data = latestCart.map(
                                (cartItem) => {
                                    totalOriginalPrice += cartItem.product_id.original_price * cartItem.qty;
                                    totalFinalPrice += cartItem.product_id.final_price * cartItem.qty
                                    return (
                                        {
                                            product_id: cartItem.product_id._id,
                                            qty: cartItem.qty
                                        }
                                    )
                                }
                            )
                            dispatch(dbToCart(
                                {
                                    data: data,
                                    totalOriginalPrice: totalOriginalPrice,
                                    total: totalFinalPrice
                                }
                            ))

                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                        }
                    )



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


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Login</h2>
                <form onSubmit={loginUser}>
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
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to={`/register?${searchParams.toString()}`}>
                        <span href="#" className="text-blue-600 hover:underline">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </div>


    )
}
