import React from 'react';
import { Platform, Text, TextStyle } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

import { colors } from '../../theme';

const FontSize = {
  heading: moderateVerticalScale(30),
  subHeading: moderateVerticalScale(26),
  title: moderateVerticalScale(16),
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
          color: colors.text_normal,
          fontFamily: 'Poppins-Regular',
          top: Platform.OS == 'ios' ? 0 : 2.5,
        },
        textStyle,
      ]}>
      {label}
    </Text>
  );
};

export default MyText;
