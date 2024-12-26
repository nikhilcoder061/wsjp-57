import React from 'react'
import AdminSidebar from '../componants/AdminSidebar'
import AdminHeader from '../componants/AdminHeader'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
      <div className='grid grid-cols-6'>
        <AdminSidebar />
        <div className='col-span-5 p-2'>
          <AdminHeader />
          <div className='flex justify-center items-center py-5'>
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}
