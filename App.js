import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

import MainStackNavigator from './src/navigation/AppNavigator';
import Store from './src/app/store';
import {colors} from './src/theme/index';
import AppStatusBar from './src/components/AppStatusBar';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphQL';
import {PersistGate} from 'redux-persist/integration/react';
import {requestCameraPermission} from './src/utils/helperFunctions';

export default function App() {
  useEffect(() => {
    // SplashScreen.hide(); //hides the splash screen on app load.
    requestCameraPermission();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.bottomSafeArea}>
        <AppStatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <ApolloProvider client={client}>
          <Provider store={Store.store}>
            <PersistGate loading={null} persistor={Store.persistor}>
              <MainStackNavigator />
              <FlashMessage position="top" />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSafeArea: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
});
