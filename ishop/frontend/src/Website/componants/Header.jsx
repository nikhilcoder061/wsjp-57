import React from 'react'
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {

  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.data);
  
  return (
    <header className="w-full">
      {/* First Row */}
      <div className="flex justify-end items-center p-2 border-b gap-4 text-sm">
        {
          user
            ?
            <>
              <div className='flex gap-2 items-center'>
                <span>Hello, {user?.name}</span>
              </div>
              <div className='flex gap-2 items-center'>
                <FaUserCircle />
                <span>My Profile</span>
              </div>
            </>

            :
            <Link to={'/login?ref=home'}>
              <div className='flex gap-2 items-center'>
                <FaUserCircle />
                <span>Login</span>
              </div>
            </Link>
        }

        <Link to={'/cart'}>
          <div className='flex gap-2 items-center'>
            <FaShoppingCart />
            <span>Cart ({cart.length})</span>
          </div>
        </Link>
      </div>

      {/* Second Row */}
      <div className="flex justify-center items-center py-2 bg-white">
        <img src="public/images/iSHOP Logo.svg" alt="" />
      </div>

      {/* Third Row */}
      <nav className="flex justify-center items-center gap-10 py-2">
        <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/store" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          Store
        </Link>
        <Link to="/iphone" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          iPhone
        </Link>
        <Link to="/ipad" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          iPad
        </Link>
        <Link to="/macbook" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          MacBook
        </Link>
        <Link to="/accessories" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
          Accessories
        </Link>
      </nav>
    </header>
  )
}
