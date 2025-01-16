import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../../Context/Context'
import axios from 'axios';
import Swal from 'sweetalert2'


export default function ViewColor() {

  const { fetchColor, allColor, API_BASE_URL, COLOR_URL, toastNotify } = useContext(MainContext);

  // status change start 
  const statusChange = (id) => {
    console.log(API_BASE_URL + COLOR_URL + `/status-update/${id}`);
    axios.patch(API_BASE_URL + COLOR_URL + `/status-update/${id}`).then(
      (success) => {
        if (success.data.status == 1) {
          toastNotify(success.data.msg, success.data.status);
          fetchColor();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
  // status change end

  // delete color start 

  const deleteCategory = (id) => {

    Swal.fire({
      title: "Are you sure delete color?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(API_BASE_URL + COLOR_URL + `/delete/${id}`).then(
          (success) => {
            if (success.data.status == 1) {
              toastNotify(success.data.msg, success.data.status);
              fetchColor();
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

  // delete color end 


  useEffect(
    () => {
      fetchColor();
    }, []
  )



  return (
    <>
      <div className="w-full mx-auto shadow-lg rounded-lg p-6 border">
        {/* Table Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Color List</h2>
          <Link to={'/admin/color/add'}>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              + Add New Color
            </button>
          </Link>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-6 text-left font-semibold">#</th>
                <th className="py-2 px-6 text-left font-semibold">Color Name</th>
                <th className="py-2 px-6 text-left font-semibold">Color Code</th>
                <th className="py-2 px-6 text-left font-semibold">View</th>
                <th className="py-2 px-6 text-left font-semibold">Status</th>
                <th className="py-2 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                Array.isArray(allColor)
                &&
                allColor.map(
                  (colorData, colorIndex) => {
                    return (
                      <tr key={colorIndex} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-6">{colorIndex + 1}</td>
                        <td className="py-2 px-6">{colorData.name}</td>
                        <td className="py-2 px-6">   {colorData.colorCode}</td>
                        <td className="py-2 px-6">
                          <div style={{ backgroundColor: colorData.colorCode }} className='w-6 h-6 rounded-full'></div>
                        </td>
                        <td className="py-2 px-6">
                          {
                            colorData.status == true
                              ?
                              <button onClick={() => statusChange(colorData._id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                                Active
                              </button>
                              :
                              <button onClick={() => statusChange(colorData._id)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition">
                                InActive
                              </button>
                          }
                        </td>
                        <td className="py-2 px-6">
                          <Link to={`/admin/color/edit/${colorData._id}`}>
                            <button className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition">
                              Edit
                            </button>
                          </Link>
                          <button onClick={() => deleteCategory(colorData._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2 transition">
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

    </>
  )
}
