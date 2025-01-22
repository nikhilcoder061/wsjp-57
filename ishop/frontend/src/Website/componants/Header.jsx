import React from 'react'
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full">
      {/* First Row */}
      <div className="flex justify-end items-center p-2 border-b gap-4 text-sm">
        <div className='flex gap-2 items-center'>
          <FaUserCircle />
          <span>My Profile</span>
        </div>
        <div className='flex gap-2 items-center'>
          <FaShoppingCart />
          <span>Cart (0)</span>
        </div>
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
