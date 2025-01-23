import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './reducer/AdminSlice'
import CartSlice from './reducer/CartSlice'

const store = configureStore({
    reducer: {
        admin: AdminSlice,
        cart: CartSlice
    },
})

export default store