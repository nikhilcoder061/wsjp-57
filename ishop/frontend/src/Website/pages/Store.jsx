import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Context/Context'
import { useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

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
                      <Link to={`/store/${category.slug}`} key={index}>
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
                      <li key={index} onClick={() => setProduct_color(color._id)} className='flex items-center justify-between'>
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
                    <ProductCard product={product} API_BASE_URL={API_BASE_URL} key={index} />
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
