import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Icon} from '@rneui/themed';

import {SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

export default function MyHeader({
  headerStyle,
  children,
  title,
  icon,
  leftIcon,
  onPressLeft,
  onPressRight,
}: {
  headerStyle?: ViewStyle;
  children?: React.ReactNode;
  title: string;
  icon?: string;
  leftIcon?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}) {
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: colors.primary,
        ...headerStyle,
      }}>
      {leftIcon && (
        <Icon
          name={leftIcon!!}
          size={28}
          color={colors.text_inverse}
          iconStyle={{padding: 0}}
          onPress={onPressLeft}
          containerStyle={{
            alignSelf: 'center',
            marginRight: 10,
          }}
        />
      )}
      <MyText
        label={title}
        size={'subHeading'}
        textStyle={{
          fontWeight: 'bold',
          fontFamily: 'sans-serif-medium',
          textAlignVertical: 'center',
          color: colors.text_inverse,
        }}
      />
      {icon && (
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Icon
            name={icon!!}
            size={34}
            color={colors.text_inverse}
            onPress={onPressRight}
            containerStyle={{alignSelf: 'center'}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: SCREEN_WIDTH,
    backgroundColor: '#fafafa',
    padding: 10,
    elevation: 5,
    borderRadius: 2,
    flexDirection: 'row',
  },
});
