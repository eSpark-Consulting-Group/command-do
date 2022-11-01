import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 1,
      name: 'Wirad Ali',
      amount: 200,
      orders: [
        {
          item: 'Chicken Biryani',
          qty: 2,
        },
        {
          item: 'Salad',
          qty: 1,
        },
      ],
      paid: false,
    },
    {
      id: 2,
      name: 'Mudassir Raza',
      amount: 350,
      orders: [
        {
          item: 'Chicken Biryani',
          qty: 2,
        },
        {
          item: 'Egg Burger',
          qty: 2,
        },
      ],
      paid: false,
    },
    {
      id: 3,
      name: 'Faraz Uddin',
      amount: 50,
      orders: [
        {
          item: 'Salad',
          qty: 1,
        },
        {
          item: 'Raita',
          qty: 1,
        },
      ],
      paid: false,
    },
    {
      id: 4,
      name: 'Fahim Uddin',
      amount: 140,
      orders: [
        {
          item: 'Kebab',
          qty: 4,
        },
        {
          item: 'Chapati',
          qty: 4,
        },
      ],
      paid: false,
    },
    {
      id: 5,
      name: 'Jamshed Ahmed',
      amount: 130,
      orders: [
        {
          item: 'Sadi biryani',
          qty: 1,
        },
      ],
      paid: true,
    },
  ],
};

const riderOrderSlice = createSlice({
  name: 'riderOrder',
  initialState,
  reducers: {
    collectAmouunt: (state, action) => {
      console.log('Action', action.payload);
      let index = state.orders.findIndex(obj => obj.id == action.payload);
      state.orders[index].paid = true;

      // console.log(action);
    },
    revertCollection: (state, action) => {
      console.log('Action', action.payload);
      let index = state.orders.findIndex(obj => obj.id == action.payload);
      state.orders[index].paid = false;
      // console.log(action);
    },
  },
});

export const {collectAmouunt, revertCollection} = riderOrderSlice.actions;

export default riderOrderSlice.reducer;
