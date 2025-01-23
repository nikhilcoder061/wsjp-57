import React, { useEffect } from 'react'
import Header from '../componants/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../componants/Footer'
import { useDispatch } from 'react-redux'
import { lsUpdate } from '../../redux/reducer/CartSlice'

export default function Layout() {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(lsUpdate())
    }, []
  )


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
