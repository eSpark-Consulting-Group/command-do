import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
  return <StatusBar backgroundColor={backgroundColor} {...props} />;
};

export default AppStatusBar;
