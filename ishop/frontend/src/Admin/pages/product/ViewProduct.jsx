import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MainContext } from '../../../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server';


export default function ViewProduct() {

  const { API_BASE_URL, toastNotify, allProduct, fetchProduct, PRODUCT_URL } = useContext(MainContext);

  // status change start 
  const statusChange = (id, flag) => {
    axios.patch(API_BASE_URL + PRODUCT_URL + `/status-update/${id}`, { flag }).then(
      (success) => {
        if (success.data.status == 1) {
          toastNotify(success.data.msg, success.data.status);
          fetchProduct();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
  // status change end

  //view product start
  const viewProduct = (product) => {

    const popupHtml = ReactDOMServer.renderToString(<PopUpProduct product={product} API_BASE_URL={API_BASE_URL} />);
    Swal.fire({

      html: popupHtml,
      showCloseButton: true,
      showConfirmButton: false, // Hide the default confirm button
      customClass: {
        popup: 'custom-swal-popup' // Custom class for popup container
      }
    });
  }
  //view product end

  // delete Product start 

  const deleteProduct = (id) => {

    Swal.fire({
      title: "Are you sure delete category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(API_BASE_URL + PRODUCT_URL + `/delete/${id}`).then(
          (success) => {
            if (success.data.status == 1) {
              toastNotify(success.data.msg, success.data.status);
              fetchProduct();
            }
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
      }
    });



  }

  // delete Product end 


  useEffect(
    () => {
      fetchProduct()
    }, []
  )


  return (
    <div className="w-full mx-auto shadow rounded-lg p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Product List</h2>
        <Link to={'/admin/product/add'}>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add New Product
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="text-center text-sm min-w-full bg-white border border-gray-300">
          <thead>
            <tr className=" bg-blue-600 text-white">
              <th className="py-2 px-4 border-b ">
                Product Name
              </th>
              <th className="py-2 px-4 border-b ">
                Price
              </th>
              <th className="py-2 px-4 border-b ">
                Category
              </th>
              <th className="py-2 px-4 border-b ">
                Color
              </th>
              <th className="py-2 px-4 border-b ">Image</th>
              <th className="py-2 px-4 border-b ">
                Stock
              </th>
              <th className="py-2 px-4 border-b ">
                Top Selling
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

            {
              Array.isArray(allProduct)
              &&
              allProduct.map(
                (productData, productIndex) => {
                  return (
                    <tr key={productIndex}>
                      <td className="py-2 px-4 border-b">{productData.name}</td>
                      <td className="py-2 px-4 border-b"> <span className='text-green-500 font-bold'> ${productData.final_price} </span>  &nbsp;
                        <span className='text-gray-500 line-through'>${productData.original_price}</span>
                        <span className='text-red-500'> ({productData.discount_percentage}%)</span>
                      </td>
                      <td className="py-2 px-4 border-b">{productData.category_id.name}</td>
                      <td className="py-2 px-4 border-b">
                        {productData.colors.map(
                          (colorData, colorIndex) => {
                            return (
                              <span key={colorIndex}>{colorData.name} </span>

                            )
                          }
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <img
                          src={API_BASE_URL + `/images/product/${productData.main_image}`}
                          alt="Product Image"
                          className="w-10 h-10 object-cover rounded-md"
                        />

                      </td>

                      <td className="py-2 px-4 border-b">
                        {
                          productData.stock == true
                            ?
                            <button onClick={() => statusChange(productData._id, 1)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 mr-2">
                              In
                            </button>
                            :
                            <button onClick={() => statusChange(productData._id, 1)} className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 mr-2">
                              Out
                            </button>

                        }
                      </td>
                      <td className="py-2 px-4 border-b">
                        {
                          productData.top_selling == true
                            ?
                            <button onClick={() => statusChange(productData._id, 2)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 mr-2">
                              Yes
                            </button>
                            :
                            <button onClick={() => statusChange(productData._id, 2)} className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 mr-2">
                              No
                            </button>

                        }
                      </td>
                      <td className="py-2 px-4 border-b">
                        {
                          productData.status == true
                            ?
                            <button onClick={() => statusChange(productData._id, 3)} className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 mr-2">
                              Active
                            </button>
                            :
                            <button onClick={() => statusChange(productData._id, 3)} className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 mr-2">
                              Inactive
                            </button>

                        }
                      </td>
                      <td className="py-2 px-4 border-b">

                        <Link to={`/admin/product/edit/${productData._id}`}>
                          <button className="bg-blue-500 text-white py-1 px-1 rounded-md hover:bg-blue-600">
                            <FaEdit />
                          </button>
                        </Link>
                        <button onClick={() => viewProduct(productData)} className="bg-orange-500 text-white py-1 px-1 rounded-md hover:bg-orange-600 ml-2">
                          <FaEye />
                        </button>
                        <button onClick={() => deleteProduct(productData._id)} className="bg-red-500 text-white py-1 px-1 rounded-md hover:bg-red-600 mx-2">
                          <MdDelete />
                        </button>
                        <Link to={`/admin/product/multipleimage/${productData._id}`}>
                          <button className="bg-indigo-500 text-white py-1 px-1 rounded-md hover:bg-indigo-600">
                            <FaRegImages />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                }
              )
            }
          </tbody>
        </table>
      </div>
    </div >

  )
}


function PopUpProduct({ API_BASE_URL, product }) {
  console.log(product);
  return (
    <div className="container mx-auto p-4">
      <table className="table-auto text-sm w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              ID
            </td>
            <td className="border border-gray-300 px-4 py-2">{product._id}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Name
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Slug
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.slug}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Original Price
            </td>
            <td className="border border-gray-300 px-4 py-2">${product.original_price}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Discount
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.discount_percentage}%</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Final Price
            </td>
            <td className="border border-gray-300 px-4 py-2">${product.final_price}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Category
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.category_id.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Color
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {product.colors.map(
                (colorName, index) => {
                  return (
                    <span>{colorName.name},</span>
                  )
                }
              )}

            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Main Image
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <img
                src={API_BASE_URL + `/images/product/${product.main_image}`}
                alt="Product Image"
                className="w-10 h-10 object-cover rounded-md"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Other Images
            </td>
            <td className="border border-gray-300 px-4 py-2 flex">
              {
                product.other_image.map(
                  (image, index) => {
                    console.log(image);
                    return (
                      <img
                        src={API_BASE_URL + `/images/product/${image}`}
                        alt="Product Image"
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    )
                  }
                )
              }

            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Stock
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.stock == true ? "Available" : "not Available"}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Top-Selling
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.top_selling == true ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Status
            </td>
            <td className="border border-gray-300 px-4 py-2">{product.status == true ? "Active" : "Not Active"}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Short Description
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {product.short_description}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 bg-gray-200 font-semibold">
              Long Description
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {product.long_description}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  )
}