import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { colors } from '../../theme';

export default function MyCard({
  children,
  cardStyle,
}: {
  children: React.ReactNode;
  cardStyle?: ViewStyle;
}) {
  return <View style={{ ...styles.container, ...cardStyle }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
    borderRadius: 2,
  },
});
