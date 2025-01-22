import React from 'react'
import { useSelector } from 'react-redux'

export default function AdminHeader() {

  const admin = useSelector((state) => state.admin.data);


  return (
    <div className='border-b flex justify-end font-bold'>
      <h1>Hello {admin?.name} 👍</h1>
    </div>
  )
}
