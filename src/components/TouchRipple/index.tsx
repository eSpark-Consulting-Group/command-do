import React from 'react';
import {Pressable} from 'react-native';

export default function TouchRipple({
  onPress,
  children,
  rippleColor,
}: {
  onPress?: () => void;
  children?: React.ReactNode;
  rippleColor?: string;
}) {
  return (
    <Pressable
      android_ripple={{color: rippleColor ?? '#f5f5f533'}}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}
