import { createSlice } from '@reduxjs/toolkit'


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        total: 0,
        totalOriginalPrice: 0
    },

    reducers: {
        addToCart(state, { payload }) {

            const product = state.data.find((p) => p.product_id == payload.product_id)

            if (product) {
                product.qty++
            } else {
                state.data.push({ product_id: payload.product_id, qty: 1 })
            }
            state.total += payload.price;
            state.totalOriginalPrice += payload.totalOriginalPrice;

            localStorage.setItem('CartItem', JSON.stringify(state.data));
            localStorage.setItem('total', state.total);
            localStorage.setItem('totalOriginalPrice', state.totalOriginalPrice);

        },
        dbToCart(state, { payload }) {
            state.data = payload.data;
            state.total = payload.total;
            state.totalOriginalPrice = payload.totalOriginalPrice;

            localStorage.setItem('CartItem', JSON.stringify(state.data));
            localStorage.setItem('total', state.total);
            localStorage.setItem('totalOriginalPrice', state.totalOriginalPrice);

        },

        lsUpdate(state) {
            const CartItem = JSON.parse(localStorage.getItem('CartItem'));
            const total = localStorage.getItem('total');
            if (CartItem != null) {
                state.data = CartItem;
                state.total = total;
            }
        }
    },

})


// Action creators are generated for each case reducer function
export const { addToCart, removeToCart, qtyIncrease, lsUpdate, dbToCart } = CartSlice.actions

export default CartSlice.reducer