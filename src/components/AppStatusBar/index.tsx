import React from 'react';
import {StatusBar} from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
  return <StatusBar backgroundColor={backgroundColor} {...props} />;
};

export default AppStatusBar;
