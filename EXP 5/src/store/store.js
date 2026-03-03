import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './artSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});