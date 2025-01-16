import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { MainContext } from '../../../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditColor() {

    const { toastNotify, API_BASE_URL, COLOR_URL, fetchColor, allColor } = useContext(MainContext);
    const colorName = useRef();
    const colorCode = useRef();
    const { color_id } = useParams();
    const navigate = useNavigate()

    useEffect(
        () => {
            fetchColor(color_id)
        }, [color_id]
    )

    const addColor = (event) => {

        event.preventDefault();

        const data = {
            name: colorName.current.value,
            colorCode: colorCode.current.value
        }

        axios.put(API_BASE_URL + COLOR_URL + "/update/" + color_id, data).then(
            (success) => {
                if (success.data.status == 1) {
                    event.target.reset();
                    toastNotify(success.data.msg, success.data.status);
                    navigate('/admin/color');
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
                Edit Color
            </h2>
            {/* Form */}
            <form method="POST" encType="multipart/form-data" onSubmit={addColor}>
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Color Name */}
                    <div>
                        <label
                            htmlFor="category_name"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Color Name
                        </label>
                        <input
                            ref={colorName}
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Enter color name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required=""
                            defaultValue={allColor.name}
                        />
                    </div>
                    {/* ColorCode */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            ColorCode
                        </label>
                        <input
                            ref={colorCode}
                            type="color"
                            id="colorCode"
                            name="colorCode"
                            className="w-full h-12 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required=""
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Color
                    </button>
                </div>
            </form>
        </div>


    )
}
