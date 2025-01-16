import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { MainContext } from '../../../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCategory() {
    const { toastNotify, API_BASE_URL, CATEGORY_URL, fetchCategories, allCategory } = useContext(MainContext);
    const categoryName = useRef();
    const categorySlug = useRef();
    const { category_id } = useParams();
    const navigate = useNavigate();

    useEffect(
        () => {
            fetchCategories(category_id)
        }, [category_id]
    )

    const createSlug = () => {
        const slug = categoryName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        categorySlug.current.value = slug
    }

    const addCategory = (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("name", categoryName.current.value);
        formData.append("slug", categorySlug.current.value);
        formData.append("imageName", event.target.categoryImage.files[0] ?? null);
        // console.log(API_BASE_URL + CATEGORY_URL + "/update/" + category_id, formData);
        axios.put(API_BASE_URL + CATEGORY_URL + "/update/" + category_id, formData).then(
            (success) => {
                if (success.data.status == 1) {
                    event.target.reset();
                    toastNotify(success.data.msg, success.data.status);
                    navigate('/admin/category');
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
                Edit Category
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
                            defaultValue={allCategory.name}
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
                            defaultValue={allCategory.slug}
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
                        <img
                            src={API_BASE_URL + `/images/category/${allCategory.imageName}`}
                            alt="category-image"
                            className="w-24 rounded-lg my-2"
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Category
                    </button>
                </div>
            </form>
        </div>

    )
}
