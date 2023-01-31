import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import NetInfo from '@react-native-community/netinfo';

import MainStackNavigator from './src/navigation/AppNavigator';
import Store from './src/app/store';
import { colors } from './src/theme/index';
import AppStatusBar from './src/components/AppStatusBar';
import { client } from './src/graphQL';
import { requestCameraPermission } from './src/utils/helperFunctions';
import { BlurBackground, NoInternetModal } from './src/components';

export default function App() {
  const [isConnected, setIsConnected] = useState(null);
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.bottomSafeArea}>
        <AppStatusBar
          backgroundColor={isConnected == false ? '#000' : colors.primary}
          barStyle="light-content"
        />
        <ApolloProvider client={client}>
          <Provider store={Store.store}>
            <MenuProvider
              customStyles={{
                backdrop: {
                  backgroundColor: 'black',
                  opacity: 0.5,
                },
              }}>
              <PersistGate loading={null} persistor={Store.persistor}>
                <MainStackNavigator />
                <FlashMessage position="top" />
              </PersistGate>
            </MenuProvider>
          </Provider>
        </ApolloProvider>
      </SafeAreaView>
      <BlurBackground show={isConnected == false} />
      <NoInternetModal isVisible={isConnected == false} />
    </>
  );
}

const styles = StyleSheet.create({
  bottomSafeArea: {
    flex: 1,
  },
});
