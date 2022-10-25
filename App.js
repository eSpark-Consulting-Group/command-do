import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import MainStackNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <MainStackNavigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
