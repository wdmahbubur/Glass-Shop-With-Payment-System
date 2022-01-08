import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async () => {
        const response = await axios.get('https://stormy-journey-43640.herokuapp.com/api/orders');
        return response.data;
    }
)
export const getMyOrders = createAsyncThunk(
    'orders/getMyOrders',
    async (id) => {
        const response = await axios.get(`https://stormy-journey-43640.herokuapp.com/api/orders/${id}`);
        return response.data;
    }
)

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (id) => {
        const response = await axios.delete(`https://stormy-journey-43640.herokuapp.com/api/orders/${id}`);
        return response.data;
    }
)

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        })

        builder.addCase(getMyOrders.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        })

        builder.addCase(deleteOrder.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter((order) => order._id !== action.payload._id);

        })
    }

})

export default orderSlice.reducer