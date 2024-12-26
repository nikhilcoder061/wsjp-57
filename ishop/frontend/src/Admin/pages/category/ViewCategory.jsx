import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../../Context/Context'
import axios from 'axios';
import Swal from 'sweetalert2'


export default function ViewCategory() {

  const { fetchCategories, allCategory, API_BASE_URL, CATEGORY_URL, toastNotify } = useContext(MainContext);

  // status change start 
  const statusChange = (id) => {
    console.log(API_BASE_URL + CATEGORY_URL + `/status-update/${id}`);
    axios.patch(API_BASE_URL + CATEGORY_URL + `/status-update/${id}`).then(
      (success) => {
        if (success.data.status == 1) {
          toastNotify(success.data.msg, success.data.status);
          fetchCategories();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
  // status change end

  // delete category start 

  const deleteCategory = (id) => {

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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        axios.delete(API_BASE_URL + CATEGORY_URL + `/delete/${id}`).then(
          (success) => {
            if (success.data.status == 1) {
              toastNotify(success.data.msg, success.data.status);
              fetchCategories();
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

  // delete category end 


  useEffect(
    () => {
      fetchCategories();
    }, []
  )

  return (
    <div className="w-full mx-auto shadow-lg rounded-lg p-6 border">
      {/* Table Header */}
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-700">Category List</h2>
        <Link to={'/admin/category/add'}>
          <button class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add New Category
          </button>
        </Link>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-6 text-left font-semibold">#</th>
              <th className="py-2 px-6 text-left font-semibold">Product Name</th>
              <th className="py-2 px-6 text-left font-semibold">Slug</th>
              <th className="py-2 px-6 text-left font-semibold">Image</th>
              <th className="py-2 px-6 text-left font-semibold">Status</th>
              <th className="py-2 px-6 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              Array.isArray(allCategory)
              &&
              allCategory.map(
                (categoryData, categoryIndex) => {
                  return (
                    <tr key={categoryIndex} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-6">{categoryIndex + 1}</td>
                      <td className="py-2 px-6">{categoryData.name}</td>
                      <td className="py-2 px-6">{categoryData.slug}</td>
                      <td className="py-2 px-6">
                        <img
                          src={API_BASE_URL + `/images/category/${categoryData.imageName}`}
                          alt="category-image"
                          className="w-10 h-10 rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-6">
                        {
                          categoryData.status == true
                            ?
                            <button onClick={() => statusChange(categoryData._id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                              Active
                            </button>
                            :
                            <button onClick={() => statusChange(categoryData._id)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition">
                              InActive
                            </button>
                        }
                      </td>
                      <td className="py-2 px-6">
                        <Link to={`/admin/category/edit/${categoryData._id}`}>
                          <button className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition">
                            Edit
                          </button>
                        </Link>
                        <button onClick={() => deleteCategory(categoryData._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2 transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                }
              )
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}
