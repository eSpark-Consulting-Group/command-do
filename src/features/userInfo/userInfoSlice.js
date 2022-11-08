import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  orders: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.userData = action.payload.data;
    },
    updateUserDetails: (state, action) => {
      state.userData = action.payload;
    },
    getOrderHistory: (state, action) => {
      console.log('Order History', action.payload);
      state.orders = action.payload;
    },
  },
});

export const {getUserDetails, updateUserDetails, getOrderHistory} =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
