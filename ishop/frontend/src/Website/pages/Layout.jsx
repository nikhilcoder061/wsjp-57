import React, { useEffect } from 'react'
import Header from '../componants/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../componants/Footer'
import { useDispatch } from 'react-redux'
import { lsUpdate } from '../../redux/reducer/CartSlice'
import { login } from '../../redux/reducer/UserSlice'

export default function Layout() {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(lsUpdate())
    }, []
  )


  useEffect(
    () => {
      const isUser = JSON.parse(localStorage.getItem('user'));
      const isUser_token = localStorage.getItem('user_token');

      if (isUser) {
        dispatch(login({ data: isUser, token: isUser_token }))
      }

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
