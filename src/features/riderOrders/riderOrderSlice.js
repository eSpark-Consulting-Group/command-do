/**
 * @params Wirad's Code!
 * This code is used for riderFunctions for redux
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};
const riderOrderSlice = createSlice({
  name: 'riderOrder',
  initialState,
  reducers: {
    getOrders: (state, action) => {
      console.log('Action', action.payload);
      state.orders = action.payload;
      // console.log(action);
    },
    collectAmouunt: (state, action) => {
      console.log('Action', action.payload);
      let index = state.orders.findIndex(obj => obj.id == action.payload);
      state.orders[index].status = 'PAID';
      console.log('Updated', state.orders[index]);
    },
    revertCollection: (state, action) => {
      console.log('Action', action.payload);
      let index = state.orders.findIndex(obj => obj.id == action.payload);
      state.orders[index].status = 'UNPAID';
      // console.log(action);
    },
  },
});

export const {collectAmouunt, revertCollection, getOrders} =
  riderOrderSlice.actions;

export default riderOrderSlice.reducer;
