import React from 'react';
import {Pressable} from 'react-native';

export default function TouchRipple({
  onPress,
  children,
  rippleColor,
  darkRipple,
}: {
  onPress?: () => void;
  children?: React.ReactNode;
  rippleColor?: string;
  darkRipple?: boolean;
}) {
  return (
    <Pressable
      android_ripple={{
        color: rippleColor ?? darkRipple ? '#8f8f8f29' : '#f5f5f533',
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}
