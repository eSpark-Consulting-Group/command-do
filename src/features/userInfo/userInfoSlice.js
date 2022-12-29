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
      action.payload.map(item => {
        order.push({
          title: new Date(item.createdAt).toString().slice(0, 15),
          data: [item],
        });
      });
      state.orders = order?.reverse();
    },
    logout: (state, action) => {
      state.userData = null;
      state.orders = null;
      state.users = [];
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
