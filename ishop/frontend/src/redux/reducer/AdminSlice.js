import { createSlice } from '@reduxjs/toolkit'


export const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null,
    },

    reducers: {
        login(state, current) {
            state.data = current.payload.data;
            localStorage.setItem('admin', JSON.stringify(current.payload.data))
        },
        logout(state) {
            state.data = null;
            localStorage.removeItem('admin');
        }
    },

})

// Action creators are generated for each case reducer function
export const { login, logout } = AdminSlice.actions

export default AdminSlice.reducer