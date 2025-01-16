import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../../Context/Context';
import Select from 'react-select'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditProduct() {

    const { toastNotify, API_BASE_URL, fetchCategories, fetchColor, allCategory, allColor, PRODUCT_URL, allProduct, fetchProduct } = useContext(MainContext);
    const productName = useRef();
    const productSlug = useRef();
    const originalPrice = useRef();
    const discountPercentage = useRef();
    const finalPrice = useRef();
    const [selColor, setSelColor] = useState([])
    const { productId } = useParams();

    const createSlug = () => {
        const slug = productName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        productSlug.current.value = slug
    }

    const calculateFinalPrice = () => {
        finalPrice.current.value = originalPrice.current.value - (originalPrice.current.value * discountPercentage.current.value / 100)
    }


    const editProduct = (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("name", productName.current.value);
        formData.append("slug", productSlug.current.value);
        formData.append("original_price", originalPrice.current.value);
        formData.append("discount_percentage", discountPercentage.current.value);
        formData.append("final_price", finalPrice.current.value);
        formData.append("short_description", event.target.short_description.value);
        formData.append("long_description", event.target.long_description.value);
        formData.append("category_id", event.target.category.value);
        formData.append("colors", JSON.stringify(selColor));
        formData.append("main_image", event.target.main_image.files[0] ?? null);

        axios.put(API_BASE_URL + PRODUCT_URL + "/update/" + productId, formData).then(
            (success) => {
                console.log(success.data);
                if (success.data.status == 1) {
                    event.target.reset();
                    toastNotify(success.data.msg, success.data.status)
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );

    }

    useEffect(
        () => {
            fetchCategories();
            fetchColor();
            fetchProduct(productId);
        }, []
    )

    return (

        <div className="w-full mx-auto p-8 border rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Add Product</h1>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={editProduct}>
                {/* Product Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Product Name
                    </label>
                    <input
                        defaultValue={allProduct.name}
                        onChange={createSlug}
                        ref={productName}
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                {/* Product Slug */}
                <div>
                    <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Slug
                    </label>
                    <input
                        defaultValue={allProduct.slug}
                        readOnly
                        ref={productSlug}
                        type="text"
                        id="slug"
                        name="slug"
                        className="w-full border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none p-2"
                    />
                </div>
                {/* Image */}
                <div>
                    <label
                        htmlFor="main_image"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Main Image
                    </label>
                    <input
                        type="file"
                        id="main_image"
                        name="main_image"
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>

                {/* Original Price */}
                <div>
                    <label
                        htmlFor="original-price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Original Price
                    </label>
                    <input
                        defaultValue={allProduct.original_price}
                        onChange={calculateFinalPrice}
                        ref={originalPrice}
                        type="number"
                        id="original-price"
                        name="original_price"
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                {/* Discount Percentage */}
                <div>
                    <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Discount Percentage
                    </label>
                    <input
                        defaultValue={allProduct.discount_percentage}
                        onChange={calculateFinalPrice}
                        ref={discountPercentage}
                        type="number"
                        id="discount"
                        name="discount"
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                {/* Final Price */}
                <div>
                    <label
                        htmlFor="final-price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Final Price
                    </label>
                    <input
                        defaultValue={allProduct.final_price}
                        ref={finalPrice}
                        type="number"
                        id="final-price"
                        name="final_price"
                        className="w-full border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none p-2"
                        readOnly
                    />
                </div>
                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Category
                    </label>

                    <Select name='category' options={
                        allCategory.map(
                            (category, index) => {
                                return (
                                    { value: category._id, label: category.name }
                                )
                            }
                        )
                    } />
                </div>
                {/* Color */}
                <div>
                    <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Color
                    </label>

                    <Select
                        onChange={
                            (option) => {
                                const finalData = option.map(
                                    (data, index) => {
                                        return data.value
                                    }
                                )
                                setSelColor(finalData)
                            }
                        }

                        isMulti options={
                            allColor.map(
                                (color, index) => {
                                    return (
                                        { value: color._id, label: color.name }
                                    )
                                }
                            )
                        } />
                </div>
                {/* Short Description */}
                <div className="">
                    <label
                        htmlFor="short-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Short Description
                    </label>
                    <textarea
                        defaultValue={allProduct.short_description}
                        id="short-description"
                        name="short_description"
                        rows={2}
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                {/* Long Description */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="long-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Long Description
                    </label>
                    <textarea
                        defaultValue={allProduct.long_description}
                        id="long-description"
                        name="long_description"
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                {/* Submit Button */}
                <div className="md:col-span-1 flex justify-start items-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>

    )
}
