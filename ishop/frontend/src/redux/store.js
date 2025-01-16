import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './reducer/AdminSlice'

const store = configureStore({
    reducer: {
        admin: AdminSlice
    },
})

export default store