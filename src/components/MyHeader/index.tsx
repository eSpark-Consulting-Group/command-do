import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Icon} from '@rneui/themed';

import {SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';
import GapView from '../GapView';
import {moderateVerticalScale} from 'react-native-size-matters';

export default function MyHeader({
  headerStyle,
  titleStyle,
  children,
  title,
  icon,
  leftIcon,
  onPressLeft,
  onPressRight,
  rightIconType,
  leftIconType,
  iconComponent,
  leftIconComponent,
}: {
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  children?: React.ReactNode;
  title: string;
  icon?: string;
  leftIcon?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  rightIconType?: string;
  leftIconType?: string;
  iconComponent: React.ReactNode;
  leftIconComponent: React.ReactNode;
}) {
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: colors.primary,
        ...headerStyle,
      }}>
      {leftIconComponent && leftIconComponent}
      {leftIcon && (
        <Icon
          name={leftIcon!!}
          type={leftIconType}
          size={moderateVerticalScale(28)}
          color={colors.text_inverse}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 50,
          }}
          onPress={onPressLeft}
          containerStyle={{
            borderRadius: 100,
            alignSelf: 'center',
            right: 5,
          }}
          pressableProps={{
            android_ripple: {borderless: true, color: '#f5f5f533'},
          }}
        />
      )}
      {!leftIcon && <GapView mode="horizontal" length={1} />}
      <MyText
        label={title}
        size={'heading'}
        textStyle={{
          textAlignVertical: 'center',
          color: colors.text_inverse,
          ...titleStyle,
        }}
      />
      {icon && (
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Icon
            name={icon!!}
            size={moderateVerticalScale(28)}
            type={rightIconType}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
            }}
            containerStyle={{borderRadius: 100, alignSelf: 'center'}}
            pressableProps={{
              android_ripple: {borderless: true, color: '#f5f5f533'},
            }}
            color={colors.text_inverse}
            onPress={onPressRight}
          />
        </View>
      )}
      {iconComponent && (
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          {iconComponent}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: SCREEN_WIDTH,
    padding: 10,
    elevation: 5,
    flexDirection: 'row',
  },
});
