import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewProduct() {
  return (
    <div className="w-full mx-auto shadow rounded-lg p-6 border">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-700">Product List</h2>
        <Link to={'/admin/product/add'}>
          <button class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add New Product
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="text-center text-sm min-w-full bg-white border border-gray-300">
          <thead>
            <tr className=" bg-blue-600 text-white">
              <th className="py-2 px-4 border-b ">
                S.No.
              </th>
              <th className="py-2 px-4 border-b ">
                Product Name
              </th>
              <th className="py-2 px-4 border-b ">
                Price
              </th>
              <th className="py-2 px-4 border-b ">
                Category
              </th>
              <th className="py-2 px-4 border-b ">Image</th>
              <th className="py-2 px-4 border-b ">
                Brand
              </th>
              <th className="py-2 px-4 border-b ">
                Status
              </th>
              <th className="py-2 px-4 border-b ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td className="py-2 px-4 border-b">1</td>
              <td className="py-2 px-4 border-b">Example Product</td>
              <td className="py-2 px-4 border-b">$29.99</td>
              <td className="py-2 px-4 border-b">Electronics</td>
              <td className="py-2 px-4 border-b">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Product Image"
                  className="w-10 h-10 object-cover rounded-md"
                />

              </td>

              <td className="py-2 px-4 border-b">Brand Name</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 mr-2">
                  Active
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >

  )
}
