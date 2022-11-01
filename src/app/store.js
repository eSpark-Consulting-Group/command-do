import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import profileReducer from '../features/profile/profileSlice';
import riderOrderSlice from '../features/riderOrders/riderOrderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
    riderOrder: riderOrderSlice,
  },
});
