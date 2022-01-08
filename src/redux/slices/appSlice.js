import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading: false,
        openBasket: false,
        success: false,
        error: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        openBasket: (state, action) => {
            state.openBasket = action.payload
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setLoading, openBasket, setSuccess, setError } = appSlice.actions

export default appSlice.reducer