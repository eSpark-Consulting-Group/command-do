import { createSlice } from '@reduxjs/toolkit';
import { AllData } from '../../utils/data';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  menuItems: AllData,
  foodType: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const data = action.payload;
      const sameItem = state.cartItems.filter((item) => (item.name === data.name))

      if (sameItem.length != 0) {
        state.cartItems.map((item, index) => {
          if (item.name === data.name) {
            if (data.quantity == 0) {
              state.cartItems.splice(index, 1)
              // console.log(data.quantity, '====< data.quantity');
            } else {
              state.cartItems[index].quantity = data.quantity;
            }
          }
          AllData?.map((allItems, index) => {
            if (allItems.name === data.foodType) {
              allItems.data.map((menuItem, menuIndex) => {
                if (menuItem.name === data.name) {
                  state.menuItems[index].data[menuIndex].quantity = data.quantity;
                  // console.log('check item--->', state.menuItems[index].data[menuIndex].quantity);
                }
              })
              // console.log('allItems===>', allItems);
            }
          })
        })
        // increase()
      } else {
        state.cartItems = [...state.cartItems, data];
        AllData?.map((allItems, index) => {
          if (allItems.name === data.foodType) {
            allItems.data.map((menuItem, menuIndex) => {
              if (menuItem.name === data.name) {
                state.menuItems[index].data[menuIndex].quantity = data.quantity;
                // console.log('check item--->', state.menuItems[index].data[menuIndex].quantity);
              }
            })
          }
        })
        // increase()
      }
    },
    changeType: (state, action) => {
      state.foodType = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      AllData?.map((allItems, index) => {
        // if (allItems.name === data.foodType) {
          allItems.data.map((menuItem, menuIndex) => {
            // if (menuItem.name === data.name) {
              state.menuItems[index].data[menuIndex].quantity = 0;
              // console.log('check item--->', state.menuItems[index].data[menuIndex].quantity);
            // }
          })
        // }
      });
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      // const addQty = action.payload;
      // state.amount = state.amount + 1;
      // console.log(state?.cartItems);
      var makeTotal = 0;
      if (state?.cartItems) {
        state?.cartItems.map((item, index) => {
          makeTotal = makeTotal + Number(item.quantity);
        })
        state.amount = makeTotal;
      }

    },
    decrease: (state, { payload }) => {
      // const cartItem = state.cartItems.find((item) => item.id === payload.id);
      state.amount = state.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals, addItem, changeType } =
  cartSlice.actions;

export default cartSlice.reducer;