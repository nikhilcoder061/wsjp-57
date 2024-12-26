import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  const toastMsg = (msg, status) => {

    toast(msg, { type: status ? 'success' : 'error' });

  }
  // get all users start 

  const getAllUser = () => {
    axios.get("http://localhost:5000/user").then(
      (success) => {
        setUsers(success.data.users);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )

  }

  useEffect(
    () => {
      getAllUser();
    }, []
  )

  // get all users end

  // add new user start

  const addUser = (event) => {
    // console.log(event);
    event.preventDefault();

    const newUserData = {
      name: event.target.name.value,
      email: event.target.email.value,
      age: event.target.age.value,
      phone: event.target.phone.value,
      password: event.target.password.value
    }

    let response;

    if (userDetail == null) {
      response = axios.post("http://localhost:5000/user/register", newUserData);
    } else if (userDetail.status == true) {
      response = axios.put(`http://localhost:5000/user/update/${userDetail._id}`, newUserData);
    } else {
      alert("User not active")
    }

    response.then(
      (success) => {
        getAllUser();
        event.target.reset();
        toastMsg(success.data.msg, success.data.status);
        setUserDetail(null);
      }
    ).catch(
      (error) => {
        console.log(error);
        toastMsg(error.data.msg, error.data.status)
      }
    )

  }

  // add new user end

  //delete user start

  const deleteUser = (userId) => {
    if (confirm("Are you Sure ?")) {
      axios.delete(`http://localhost:5000/user/delete/${userId}`).then(
        (success) => {
          getAllUser();
          toastMsg(success.data.msg, success.data.status)
        }
      ).catch(
        (error) => {
          toastMsg(error.data.msg, error.data.status)
        }
      )
    }

  }

  //delete user end

  //status change start

  const statusChange = (userId) => {

    axios.patch(`http://localhost:5000/user/status-change/${userId}`).then(
      (success) => {
        getAllUser();
        toastMsg(success.data.msg, success.data.status)
      }
    ).catch(
      (error) => {

      }
    )

  }

  //status change end

  // update user
  const updateUser = (data) => {
    if (data.status == false) {
      alert("User not active")
    } else {
      setUserDetail(data);
    }
  }



  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="container mx-auto flex justify-between max-w-7xl gap-2">
        {/* Form Section */}
        <div className="bg-white p-6 rounded shadow-md w-[25%]" >
          <h2 className="text-2xl font-bold mb-4">User Form</h2>
          <form id="userForm" className="space-y-4" onSubmit={addUser}>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                required=""
                name='name'
                defaultValue={userDetail?.name}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                required=""
                name='email'
                defaultValue={userDetail?.email}
              />
            </div>
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                className="w-full p-2 border rounded"
                placeholder="Enter your age"
                required=""
                name='age'
                defaultValue={userDetail?.age}
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                className="w-full p-2 border rounded"
                placeholder="Enter your phone number"
                required=""
                name='phone'
                defaultValue={userDetail?.phone}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                required=""
                name='password'
                defaultValue={userDetail?.password}
              />
            </div>
            <button
              type="submit"

              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {
                userDetail == null ? "Add User" : "Update User"
              }

            </button>
          </form>
        </div>
        {/* Table Section */}
        <div className="bg-white mt-6 p-6 rounded shadow-md w-[75%]">
          <h2 className="text-2xl font-bold mb-4">Users Table</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody id="userTable" className="bg-gray-50">
              {
                users.map(
                  (userData, userIndex) => {
                    return (
                      <tr class="border">
                        <td class="border p-2">{userData.name}</td>
                        <td class="border p-2">{userData.email}</td>
                        <td class="border p-2">{userData.age}</td>
                        <td class="border p-2">{userData.phone}</td>
                        <td class="border p-2">
                          {
                            userData.status == true
                              ?
                              <button onClick={() => statusChange(userData._id)} class="bg-green-500 text-white px-2 mx-1 py-1 rounded hover:bg-green-600">Active</button>
                              :
                              <button onClick={() => statusChange(userData._id)} class="bg-gray-500 text-white px-2 mx-1 py-1 rounded hover:bg-gray-600">Inactive</button>
                          }

                        </td>
                        <td class="border p-2">
                          <button onClick={() => updateUser(userData)} class="bg-yellow-500 text-white px-2 mx-1 py-1 rounded hover:bg-yellow-600">Edit</button>
                          <button onClick={() => deleteUser(userData._id)} class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
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
