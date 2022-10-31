import React from 'react';
import {Text, Dimensions, TextStyle} from 'react-native';
import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

const FontSize = {
  heading: height * 0.045,
  subHeading: height * 0.038,
  title: height * 0.02,
  subTitle: height * 0.019,
  default: height * 0.02,
};

const MyText = ({
  label,
  size = 'default',
  textStyle,
}: {
  label?: string;
  size?: 'heading' | 'subHeading' | 'title' | 'subTitle' | 'default' | number;
  textStyle?: TextStyle;
}) => {
  return (
    <Text
      style={[
        {
          fontSize: FontSize[size!!] ?? size,
          color: '#000',
          fontFamily: 'monospace',
        },
        textStyle,
      ]}>
      {label}
    </Text>
  );
};

export default MyText;
