import React from 'react';
import {LayoutAnimation, LayoutAnimationConfig} from 'react-native';

export const useLayoutAnimation = (duration?) => {
  LayoutAnimation.configureNext({
    duration: duration ? duration : 300,
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
