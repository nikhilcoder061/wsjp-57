import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export const MainContext = createContext();

export default function Context({ children }) {
    const API_BASE_URL = "http://localhost:5000";
    const CATEGORY_URL = "/category";
    const COLOR_URL = "/color";
    const PRODUCT_URL = "/product";
    const toastNotify = (msg, status) => toast(msg, { type: status == true ? 'success' : 'error' });
    const [allCategory, setAllCategory] = useState([]);
    const [allColor, setAllColor] = useState([]);
    const [allProduct, setAllProduct] = useState([]);

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

    const fetchColor = (color_id = null) => {

        let colorFetchApi = API_BASE_URL + COLOR_URL
        if (color_id != null) {
            colorFetchApi = colorFetchApi + `/${color_id}`
        }

        axios.get(colorFetchApi).then(
            (success) => {
                setAllColor(success.data.color)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    const fetchProduct = (product_id = null, limit = 0, categorySlug = null, product_color = null) => {

        let productFetchApi = API_BASE_URL + PRODUCT_URL
        if (product_id != null) {
            productFetchApi = productFetchApi + `/${product_id}`
        }

        const query = new URLSearchParams();
        query.append("limit", limit);
        query.append("categorySlug", categorySlug);
        query.append("product_color", product_color);


        axios.get(productFetchApi + '?' + query).then(
            (success) => {
                setAllProduct(success.data.product)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <MainContext.Provider value={{
            toastNotify, API_BASE_URL, CATEGORY_URL, COLOR_URL, PRODUCT_URL,
            fetchCategories, fetchColor, allCategory, allColor, allProduct, fetchProduct
        }}>
            {children}
            <ToastContainer autoClose={1000} />
        </MainContext.Provider>
    )
}

