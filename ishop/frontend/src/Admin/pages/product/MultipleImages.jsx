import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../../Context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MultipleImages() {

    const { toastNotify, API_BASE_URL, PRODUCT_URL, allProduct, fetchProduct } = useContext(MainContext);
    const { productId } = useParams();
    // const [otherImages, setOtherImages] = useState([])

    useEffect(
        () => {
            fetchProduct(productId)
        }, [productId]
    )

    const uploadImages = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let image of event.target.other_image.files) {
            formData.append("other_image", image)
        }

        axios.post(API_BASE_URL + PRODUCT_URL + "/multiple-image/" + productId, formData).then(
            (success) => {
                if (success.data.status == 1) {
                    event.target.reset();
                    toastNotify(success.data.msg, success.data.status);
                    fetchProduct(productId)
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );

    }




    return (
        <div className="w-full mx-auto p-8 border rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Upload images</h1>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={uploadImages}>

                <div>
                    <label
                        htmlFor="other_image"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Other Image
                    </label>
                    <input
                        multiple
                        type="file"
                        id="other_image"
                        name="other_image"
                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>


                {/* Submit Button */}
                <div className="md:col-span-1 flex justify-start items-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600"
                    >
                        Upload Images
                    </button>
                </div>

            </form>
            <div className='flex my-5'>
                {
                    allProduct.other_image?.map(
                        (d, i) => {
                            console.log(d);
                            return (
                                <img
                                    src={API_BASE_URL + `/images/product/${d}`}
                                    alt="Product Image"
                                    className="w-20 mx-3 object-cover rounded-md"
                                />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}
