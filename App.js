import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainStackNavigator from './src/navigation/AppNavigator';
import {store} from './src/app/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
