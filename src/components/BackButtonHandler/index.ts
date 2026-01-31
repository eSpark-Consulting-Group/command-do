import {View, Text, Alert, BackHandler} from 'react-native';
import React, {useEffect} from 'react';

const BackButtonHandler = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit App?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  return null;
};

export default BackButtonHandler;
