import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
  return <StatusBar backgroundColor={backgroundColor} {...props} />;
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: BAR_HEIGHT,
  },
});

export default AppStatusBar;
