import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface counterState {
  value: number;
  name: string;
}

const initialState: counterState = {
  value: 10,
  name: 'hello',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increamented(state) {
      state.value++;
    },
  },
});

export const {increamented} = counterSlice.actions;
export default counterSlice.reducer;
