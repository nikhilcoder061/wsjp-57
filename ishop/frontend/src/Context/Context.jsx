import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export const MainContext = createContext();

export default function Context({ children }) {
    const API_BASE_URL = "http://localhost:5000";
    const CATEGORY_URL = "/category";
    const toastNotify = (msg, status) => toast(msg, { type: status == true ? 'success' : 'error' });
    const [allCategory, setAllCategory] = useState([]);

    const fetchCategories = (category_id = null) => {

        let categoryFetchApi = API_BASE_URL + CATEGORY_URL
        if (category_id != null) {
            categoryFetchApi = categoryFetchApi + `/${category_id}`
        }

        axios.get(categoryFetchApi).then(
            (success) => {
                setAllCategory(success.data.category)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <MainContext.Provider value={{ toastNotify, API_BASE_URL, CATEGORY_URL, fetchCategories, allCategory }}>
            {children}
            <ToastContainer autoClose={1000} />
        </MainContext.Provider>
    )
}

