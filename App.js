import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainStackNavigator from './src/navigation/AppNavigator';
import {store} from './src/app/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
