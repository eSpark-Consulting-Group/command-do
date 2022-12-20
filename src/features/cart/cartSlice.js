import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  foodType: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const data = action.payload;
      const sameItem = state.cartItems.filter(item => item.name === data.name);
      console.log('data', data);
      if (sameItem.length != 0) {
        state.cartItems.map((item, index) => {
          if (item.name === data.name) {
            if (data.quantity == 0) {
              state.cartItems.splice(index, 1);
            } else {
              state.cartItems[index].quantity = data.quantity;
            }
          }
        });
      } else {
        state.cartItems = [...state.cartItems, data];
      }
    },
    changeType: (state, action) => {
      state.foodType = action.payload;
    },
    clearCart: state => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increase: (state, action) => {
      var makeTotal = 0;
      if (state?.cartItems) {
        state?.cartItems.map((item, index) => {
          makeTotal = makeTotal + Number(item.quantity);
        });
        state.amount = makeTotal;
      }
    },
    decrease: (state, {payload}) => {
      state.amount = state.amount - 1;
    },
    calculateTotals: state => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addItem,
  changeType,
} = cartSlice.actions;

export default cartSlice.reducer;
