import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import MainStackNavigator from './src/navigation/AppNavigator';
import {store} from './src/app/store';
import {colors} from './src/theme/index';
import AppStatusBar from './src/components/AppStatusBar';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphQL';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <AppStatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <ApolloProvider client={client}>
          <Provider store={store}>
            <MainStackNavigator />
            <FlashMessage position="top" />
          </Provider>
        </ApolloProvider>
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
    backgroundColor: colors.primary,
  },
});
