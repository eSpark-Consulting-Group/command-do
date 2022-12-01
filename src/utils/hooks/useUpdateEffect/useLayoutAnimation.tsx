import React from 'react';
import {LayoutAnimation} from 'react-native';

export const useLayoutAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 100,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });
  return true;
};