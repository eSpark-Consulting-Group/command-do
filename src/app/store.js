import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer
  },
});