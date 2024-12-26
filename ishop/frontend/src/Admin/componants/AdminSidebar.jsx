import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";


export default function AdminSidebar() {

  const sideMenuBar = [
    {
      slug: '/admin',
      name: "Dashboard",
      icon: <MdDashboard />
    },
    {
      slug: '/admin/category',
      name: "Category",
      icon: <MdCategory />
    },
    {
      slug: '/admin/color',
      name: "Color",
      icon: <IoIosColorPalette />
    },
    {
      slug: '/admin/product',
      name: "Products",
      icon: <MdOutlineProductionQuantityLimits />
    },
    {
      slug: '/admin',
      name: "Log out",
      icon: <MdOutlineLogout />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        Admin Panel
      </h2>
      <ul className="mt-6 space-y-4 overflow-hidden">
        {
          sideMenuBar.map(
            (data, index) => {
              return (
                <Link to={data.slug} key={index} >
                  <li className="hover:scale-x-105 hover:translate-x-3 rounded-lg duration-100 px-4 my-2 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-4">
                    <span className='text-2xl'>{data.icon}</span>
                    <span className="block text-lg">{data.name}</span>
                  </li>
                </Link>
              )
            }
          )
        }
      </ul>
    </div>

  )
}
