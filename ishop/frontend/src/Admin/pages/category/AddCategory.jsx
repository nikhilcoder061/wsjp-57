import React, { useContext, useRef } from 'react'
import axios from 'axios';
import { MainContext } from '../../../Context/Context';
import { useSelector } from 'react-redux';

export default function AddCategory() {
  const { toastNotify, API_BASE_URL, CATEGORY_URL } = useContext(MainContext);
  const categoryName = useRef();
  const categorySlug = useRef();
  const token = useSelector((state) => state.admin.token);


  const createSlug = () => {
    const slug = categoryName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    categorySlug.current.value = slug
  }

  const addCategory = (event) => {

    event.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName.current.value);
    formData.append("slug", categorySlug.current.value);
    formData.append("imageName", event.target.categoryImage.files[0]);

    axios.post(API_BASE_URL + CATEGORY_URL + "/create", formData,
      {
        headers: {
          Authorization: token
        }
      }
    ).then(
      (success) => {
        toastNotify(success.data.msg, success.data.status)
        if (success.data.status == 1) {
          event.target.reset();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

  return (
    <div className="w-2/3 border mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Form Header */}
      <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
        Add Category
      </h2>
      {/* Form */}
      <form method="POST" encType="multipart/form-data" onSubmit={addCategory}>
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Category Name */}
          <div>
            <label
              htmlFor="category_name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              onChange={createSlug}
              ref={categoryName}
              type="text"
              id="category_name"
              name="category_name"
              placeholder="Enter category name"
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
              Slug
            </label>
            <input
              readOnly
              ref={categorySlug}
              type="text"
              id="slug"
              name="slug"
              placeholder="Enter slug"
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
              id="categoryImage"
              name="image"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>

  )
}
