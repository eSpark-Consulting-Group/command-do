/**
 * @params Wirad's Code!
 * This code is used for riderFunctions for redux
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  adminOrders: [],
  Users: [],
};
const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {
    getOrdersByDate: (state, action) => {
      console.log('Action', action.payload);
      let order = [];
      action.payload.map(item => {
        order.push({
          title: new Date(item.createdAt).toString().slice(0, 15),
          data: [item],
        });
      });
      state.adminOrders = order;
      console.log('ORDER', order);
    },
  },
});

export const {getOrdersByDate} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
