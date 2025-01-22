import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Context/Context'
import { useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Store() {

  const { toastNotify, API_BASE_URL, CATEGORY_URL, COLOR_URL, PRODUCT_URL,
    fetchCategories, fetchColor, allCategory, allColor, allProduct, fetchProduct } = useContext(MainContext)

  const [limit, setLimit] = useState(20);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();
  const [product_color, setProduct_color] = useState(null)

  useEffect(
    () => {
      fetchCategories();
      fetchColor();

      if (searchParams.get("limit")) {
        setLimit(searchParams.get("limit"));
      }


    }, []
  )

  useEffect(
    () => {
      const query = {}
      query['limit'] = limit

      if (product_color != null) {
        query['product_color'] = product_color
      }
      fetchProduct(null, limit, categorySlug, product_color);
      setSearchParams(query)
    }, [limit, categorySlug, product_color]
  )

  return (
    <div className='grid grid-cols-6 p-4 gap-10'>
      <div className='bg-red-100'>
        <aside className="bg-white shadow-md h-screen p-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {
                allCategory?.map(
                  (category, index) => {
                    return (
                      <Link to={`/store/${category.slug}`}>
                        <li className='flex justify-between hover:bg-gray-200'>
                          <span className="block p-2 rounded cursor-pointer">
                            {category.name}
                          </span>
                          <span className="block p-2 rounded  cursor-pointer">
                            ({category.productCount})
                          </span>
                        </li>
                      </Link>
                    )
                  }
                )
              }

            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Colors</h3>
            <ul className="space-y-2">
              {
                allColor?.map(
                  (color, index) => {
                    return (
                      <li onClick={() => setProduct_color(color._id)} className='flex items-center justify-between'>
                        <span className="block p-2 rounded hover:bg-gray-200 cursor-pointer">
                          {color.name}
                        </span>
                        <span className='w-4 h-4 block rounded-full' style={{ backgroundColor: color.colorCode }}></span>
                      </li>
                    )
                  }
                )
              }

            </ul>
          </div>

        </aside>

      </div>
      <div className='col-span-5'>
        <select name="" id="" className='border' onChange={(e) => setLimit(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product Card */}
            {
              allProduct?.map(
                (product, index) => {
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
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )
                }
              )
            }

            {/* Repeat the card for more products */}
          </div>
        </div>

      </div>
    </div>
  )
}
