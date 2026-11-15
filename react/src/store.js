import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice';
import categoriesReducer from './slice/categoriesSlice';
import authReducer from './slice/AuthSlice';
import ordersReducer from './slice/ordersSlice';
const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});

export default store;