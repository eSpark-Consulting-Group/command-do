/**
 * @params Wirad's Code!
 * This code is used for riderFunctions for redux
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  collectionFinished: false,
  orderPurchased: false,
  returnMoneyOrders: [],
};
const riderOrderSlice = createSlice({
  name: 'riderOrder',
  initialState,
  reducers: {
    getOrders: (state, action) => {
      console.log('Action', action.payload);
      state.orders = action.payload;
    },
    collectAmouunt: (state, action) => {
      let index = state.orders.findIndex(obj => obj.id == action.payload.id);
      state.orders[index].status = 'PAID';
      state.orders[index].paidAmount = action.payload.amount;
      state.orders[index].riderId = action.payload.riderId;
      state.orders[index].amountCollected = true;
      console.log('Action', action.payload, 'state.orders[index]', state.orders[index]);
    },
    revertCollection: (state, action) => {
      console.log('Action', action.payload);
      let index = state.orders.findIndex(obj => obj.id == action.payload);
      state.orders[index].status = 'UNPAID';
      state.orders[index].paidAmount = 0;
      delete state.orders[index].riderId;
      delete state.orders[index].amountCollected;
    },
    toggleFinishCollection: (state, action) => {
      state.collectionFinished = action.payload;
      if (action.payload) {
        state.orders = [];
      }
    },
    toggleOrderPurchased: (state, action) => {
      state.orderPurchased = action.payload;
    },
    getReturnMoneyData: (state, action) => {
      let orders = [];
      state.orders.map(item => {
        item.remainingAmount && orders.push(item);
      });
      state.returnMoneyOrders = orders;
    },
  },
});

export const {
  collectAmouunt,
  revertCollection,
  getOrders,
  toggleFinishCollection,
  getReturnMoneyData,
  toggleOrderPurchased,
} = riderOrderSlice.actions;

export default riderOrderSlice.reducer;
