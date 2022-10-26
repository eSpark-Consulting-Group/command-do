import {View} from 'react-native';
import React from 'react';

const GapView = ({
  mode = 'vertical',
  length = 10,
}: {
  length?: number;
  mode?: 'vertical' | 'horizontal';
}) => {
  if (mode == 'horizontal') {
    return <View style={{width: length}} />;
  } else {
    return <View style={{height: length}} />;
  }
};

export default GapView;
