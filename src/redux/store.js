import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import productReducer from './product/productSlice'
import filterReducer from './product/filterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter:filterReducer
  },
});
