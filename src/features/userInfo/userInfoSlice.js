import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  orders: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.userData = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.userData = action.payload;
    },
    getOrderHistory: (state, action) => {
      console.log('Order History', action.payload);
      state.orders = action.payload;
    },
    logout: (state, action) => {
      state.userData = null;
    },
  },
});

export const {getUserDetails, updateUserDetails, getOrderHistory, logout} =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
