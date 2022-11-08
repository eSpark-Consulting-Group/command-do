import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
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
    createUser: (state, action) => {
      state.userData = action.payload;
    },
    getAllUsers: (state, action) => {
      state.userData = action.payload;
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
  logout,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
