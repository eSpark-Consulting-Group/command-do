import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
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
  },
});

export const {getUserDetails, updateUserDetails, createUser, getAllUsers} =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
