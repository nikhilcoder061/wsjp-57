import { createSlice } from '@reduxjs/toolkit'


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        total: 0
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

            localStorage.setItem('CartItem', JSON.stringify(state.data));
            localStorage.setItem('total', state.total);

        },
        removeToCart(state) {

        },
        qtyIncrease() {

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
export const { addToCart, removeToCart, qtyIncrease, lsUpdate } = CartSlice.actions

export default CartSlice.reducer