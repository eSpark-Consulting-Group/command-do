import React from 'react';
import {Text, Dimensions, TextStyle} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

const FontSize = {
  heading: moderateVerticalScale(30),
  subHeading: moderateVerticalScale(26),
  title: moderateVerticalScale(14),
  subTitle: moderateVerticalScale(12),
  default: moderateVerticalScale(14),
};

const MyText = ({
  label,
  size = 'default',
  textStyle,
  numberOfLines = 1,
}: {
  label?: string | number;
  size?: 'heading' | 'subHeading' | 'title' | 'subTitle' | 'default' | number;
  textStyle?: TextStyle;
  numberOfLines?: number;
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: FontSize[size!!] ?? size,
          color: '#000',
          fontFamily: 'Poppins-Regular',
          top: 2.5,
        },
        textStyle,
      ]}>
      {label}
    </Text>
  );
};

export default MyText;
