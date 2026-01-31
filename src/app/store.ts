import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import profileReducer from '../features/profile/profileSlice';
import riderOrderSlice from '../features/riderOrders/riderOrderSlice';
import userInfoSlice from '../features/userInfo/userInfoSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adminOrderSlice from '../features/adminOrders/adminOrderSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  profile: profileReducer,
  riderOrder: riderOrderSlice,
  userInfo: userInfoSlice,
  adminOrder: adminOrderSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default {
  store,
  persistor,
};
