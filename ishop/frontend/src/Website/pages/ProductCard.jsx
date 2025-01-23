import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducer/CartSlice'


export default function ProductCard({ product, API_BASE_URL }) {

    const dispatch = useDispatch()

    return (
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <img
                src={API_BASE_URL + `/images/product/${product.main_image}`}
                alt="Product Image"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <h3 className="text-sm text-gray-500 mb-2">{product.category_id.name}</h3>
                <div className="flex items-baseline mb-4">
                    <span className="text-red-500 text-xl font-semibold">${product.final_price} </span>
                    <span className="text-gray-500 line-through ml-2">${product.original_price}</span>
                    <span className="text-green-500 text-sm ml-4">{product.discount_percentage}% off</span>
                </div>
                <button onClick={() => dispatch(addToCart(
                    {
                        product_id: product._id,
                        price: product.final_price
                    }
                ))} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
