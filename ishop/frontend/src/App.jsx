import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminLayout from './Admin/pages/AdminLayout'
import Layout from './Website/pages/Layout'
import Dashboard from './Admin/pages/Dashboard'
import ViewCategory from './Admin/pages/category/ViewCategory'
import AddCategory from './Admin/pages/category/AddCategory'
import ViewColor from './Admin/pages/color/ViewColor'
import AddColor from './Admin/pages/color/AddColor'
import ViewProduct from './Admin/pages/product/ViewProduct'
import AddProduct from './Admin/pages/product/AddProduct'
import Home from './Website/pages/Home'
import Store from './Website/pages/Store'
import Cart from './Website/pages/Cart'
import Context from './Context/Context'
import EditCategory from './Admin/pages/category/EditCategory'

export default function App() {

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: 'store',
            element: <Store />
          },
          {
            path: 'cart',
            element: <Cart />
          }
        ]
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: 'category',
            element: <ViewCategory />
          },
          {
            path: 'category/add',
            element: <AddCategory />
          },
          {
            path: 'category/edit/:category_id',
            element: <EditCategory />
          },
          {
            path: 'color',
            element: <ViewColor />
          },
          {
            path: 'color/add',
            element: <AddColor />
          },
          {
            path: 'product',
            element: <ViewProduct />
          },
          {
            path: 'product/add',
            element: <AddProduct />
          }
        ]
      }
    ]
  )

  return (

    <Context>
      <RouterProvider router={routes}>

      </RouterProvider>
    </Context>
  )
}
