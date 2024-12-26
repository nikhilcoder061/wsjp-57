import React from 'react'

export default function AddProduct() {
  return (
    <div className="w-full border mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Form Header */}
      <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
        Add Product
      </h2>
      {/* Form */}
      <form action="#" method="POST" encType="multipart/form-data">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* product Name */}
          <div>
            <label
              htmlFor="product"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product"
              name="product"
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required=""
            />
          </div>
          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Brand
            </label>
            <input
              type="text"
              id="Brand"
              name="Brand"
              placeholder="Enter Brand"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select id="category" name="category" class="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" required>
              <option value="" disabled selected>Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="toys">Toys</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="Price"
              name="Price"
              placeholder="Enter Price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required=""
            />
          </div>
          {/* Image Upload (Full Width) */}
          <div className="col-span-2">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-3 bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>


  )
}
