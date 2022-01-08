import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get('https://stormy-journey-43640.herokuapp.com/api/products');
        return response.data;
    }
)

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id) => {
        const response = await axios.get(`https://stormy-journey-43640.herokuapp.com/api/products/${id}`);
        return response.data;
    }
)

export const getFeaturedProduct = createAsyncThunk(
    'products/getFeaturedProducts',
    async (itemsCount) => {
        const response = await axios.get(`https://stormy-journey-43640.herokuapp.com/api/products?isFeatured=true&&limit=${itemsCount}`);
        return response.data;
    }
)

export const getRecommendedProduct = createAsyncThunk(
    'products/getRecommendedProducts',
    async (itemsCount) => {
        const response = await axios.get(`https://stormy-journey-43640.herokuapp.com/api/products?isRecommended=true&&limit=${itemsCount}`);
        return response.data;
    }
)
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const response = await axios.delete(`https://stormy-journey-43640.herokuapp.com/api/products/${id}`);
        return response.data;
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        product: {},
        products: [],
        featuredProducts: [],
        recommendedProducts: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loading = false;
        })
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
        builder.addCase(getFeaturedProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getFeaturedProduct.fulfilled, (state, action) => {
            state.featuredProducts = action.payload;
            state.loading = false;
        })
        builder.addCase(getRecommendedProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getRecommendedProduct.fulfilled, (state, action) => {
            state.recommendedProducts = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product) => product._id !== action.payload._id);

        })
    }

})

export default productSlice.reducer