import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MainContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const { API_BASE_URL, allProduct, fetchProduct } = useContext(MainContext);
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate()

  const verifyLogin = () => {
    if (!user) {
      navigate('/login?ref=cart')
    } else {
      navigate('/checkout')
    }
  }


  useEffect(
    () => {
      fetchProduct()
    }, []
  )

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          <div className="overflow-x-auto">
            {
              cart.length > 0
                ?
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      cart.map(
                        (p, i) => {
                          const product = allProduct.find((d) => d._id == p.product_id)
                          return (
                            <tr key={i}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {product?.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img
                                  src={API_BASE_URL + `/images/product/${product?.main_image}`}
                                  alt="Product 1"
                                  className="h-16 w-16 object-cover object-center"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-gray-500 hover:text-gray-900">-</button>
                                <span className="mx-2">{p?.qty}</span>
                                <button className="text-gray-500 hover:text-gray-900">+</button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                  ${product?.final_price}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">{product?.category_id.name}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                  ${p?.qty * product?.final_price}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-red-500 hover:text-red-700">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        }
                      )
                    }

                  </tbody>
                </table>
                :
                "No Product Found"
            }

          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Subtotal:</span>
                <span>$39.98</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping:</span>
                <span>$5.00</span>
              </li>
              <li className="flex justify-between">
                <span>Tax:</span>
                <span>$2.00</span>
              </li>
              <li className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>$46.98</span>
              </li>
            </ul>
            <button onClick={verifyLogin} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
