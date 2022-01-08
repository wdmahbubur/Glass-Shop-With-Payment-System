import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../slices/appSlice'
import productReducer from '../slices/productSlice'
import basketSlice from '../slices/basketSlice'
import checkoutSlice from '../slices/checkoutSlice'
import orderSlice from '../slices/orderSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        products: productReducer,
        basket: basketSlice,
        checkout: checkoutSlice,
        orders: orderSlice
    }
})