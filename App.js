import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import MainStackNavigator from './src/navigation/AppNavigator';
import {store} from './src/app/store';
import {colors} from './src/theme/index'
import AppStatusBar from './src/components/AppStatusBar';
export default function App() {
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <AppStatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Provider store={store}>
          <MainStackNavigator />
        </Provider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
      flex: 0, 
  }, 
  bottomSafeArea: {
      flex: 1, 
      backgroundColor: colors.primary
  },
});