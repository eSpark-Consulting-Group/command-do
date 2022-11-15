import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  orders: null,
  users: [],
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
    createUser: (state, action) => {
      state.userData = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getOrderHistory: (state, action) => {
      let order = [];
      console.log('Order History', action.payload);
      action.payload.map(item => {
        console.log('Date', Date(item.createdAt).toString().slice(0, 15));
        console.log('item', item.User);
        order.push({
          title: Date(item.createdAt).toString().slice(0, 15),
          data: [item],
        });
      });
      console.log('Orders', order);
      state.orders = order;
    },
    logout: (state, action) => {
      state.userData = null;
    },
  },
});

export const {
  getUserDetails,
  updateUserDetails,
  createUser,
  getAllUsers,
  getOrderHistory,
  logout,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
