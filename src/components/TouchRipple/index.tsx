import React from 'react';
import {Pressable, ViewStyle} from 'react-native';

export default function TouchRipple({
  onPress,
  children,
  rippleColor,
  darkRipple,
  style,
  borderless = false,
}: {
  onPress?: () => void;
  children?: React.ReactNode;
  rippleColor?: string;
  darkRipple?: boolean;
  style?: ViewStyle;
  borderless?: boolean;
}) {
  return (
    <Pressable
      style={style}
      android_ripple={{
        borderless,
        color: rippleColor ?? darkRipple ? '#8f8f8f29' : '#f5f5f533',
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}
