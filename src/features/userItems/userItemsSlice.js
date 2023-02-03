import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadedCatergories: [],
  loadedCatergoriesItems: [],
};

const userItemsSlice = createSlice({
  name: 'userItems',
  initialState,
  reducers: {
    saveLoadedCats: (state, action) => {
      state.loadedCatergories.push({
        category_Id: action.payload,
      });
    },
    saveLoadedCatsItems: (state, action) => {
      state.loadedCatergoriesItems.push(action.payload);
    },
    updateCatItems: (state, action) => {
      let index = state.loadedCatergoriesItems.findIndex(
        x => x.id == action.payload?.id,
      );
      let obj = {
        id: action.payload?.id,
        items: action.payload.items,
      };
      state.loadedCatergoriesItems[index] = obj;
    },
    clearOnLogout: (state, action) => {
      state.loadedCatergories = [];
      state.loadedCatergoriesItems = [];
    },
  },
});

export const {
  saveLoadedCats,
  saveLoadedCatsItems,
  updateCatItems,
  clearOnLogout,
} = userItemsSlice.actions;

export default userItemsSlice.reducer;
