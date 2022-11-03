import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      console.log('Action', action.payload.data);
      state.userData = action.payload.data;
    },
    updateUserDetails: (state, action) => {
      console.log('Action', action.payload);
      // state.userData = action.payload.data;
    },
  },
});

export const {getUserDetails, updateUserDetails} = userInfoSlice.actions;

export default userInfoSlice.reducer;
