import React from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import {Icon} from '@rneui/themed';

import {SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';
import GapView from '../GapView';
import MyInput from '../MyInput';

export default function SearchBar({
  headerStyle,
  icon,
  leftIcon,
  onPressLeft,
  onPressRight,
  value,
  handleChangeText,
  onSubmit,
  Loader,
}: {
  headerStyle?: ViewStyle;
  icon?: string;
  leftIcon?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  value?: string;
  handleChangeText?: (text: string) => void;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  Loader: boolean;
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
          style={{padding: 5}}
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
      <MyInput
        value={value}
        handleChangeText={handleChangeText}
        onSubmit={onSubmit}
      />
      {icon && !Loader && (
        <View style={{flexDirection: 'row-reverse', width: SCREEN_WIDTH * 0.1}}>
          <Icon
            name={icon!!}
            size={34}
            type="ionicon"
            style={{padding: 5}}
            containerStyle={{borderRadius: 100, alignSelf: 'center'}}
            pressableProps={{
              android_ripple: {borderless: true, color: '#f5f5f533'},
            }}
            color={colors.text_inverse}
            onPress={onPressRight}
          />
        </View>
      )}

      {Loader && (
        <ActivityIndicator
          size={25}
          style={{padding: 5, width: SCREEN_WIDTH * 0.1}}
          color={colors.text_inverse}
        />
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
