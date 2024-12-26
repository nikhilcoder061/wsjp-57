import React from 'react'
import Header from '../componants/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../componants/Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
