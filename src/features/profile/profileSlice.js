import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  shift: '',
  phone: '',
  image: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initialDataUpdate: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.shift = action.payload.shift;
      state.phone = action.payload.phone;
      state.image = action.payload.image;
      // console.log(action);
    },
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.shift = action.payload.shift;
      state.phone = action.payload.phone;
    },
  },
});

export const {initialDataUpdate, updateProfile} = profileSlice.actions;

export default profileSlice.reducer;
