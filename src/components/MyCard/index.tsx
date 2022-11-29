import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {colors} from '../../theme';

export default function MyCard({
  children,
  cardStyle,
}: {
  children: React.ReactNode;
  cardStyle?: ViewStyle;
}) {
  return <View style={{...styles.container, ...cardStyle}}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    elevation: 4,
    borderRadius: 2,
  },
});
