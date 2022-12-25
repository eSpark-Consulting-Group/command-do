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
import {moderateVerticalScale} from 'react-native-size-matters';

export default function SearchBar({
  headerStyle,
  icon,
  leftIcon,
  onPressLeft,
  onPressRight,
  clearInput,
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
  clearInput?: () => void;
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
          size={moderateVerticalScale(28)}
          color={colors.text_inverse}
          style={{padding: moderateVerticalScale(5)}}
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <MyInput
          value={value}
          handleChangeText={handleChangeText}
          onSubmit={onSubmit}
        />
        {value && (
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              height: moderateVerticalScale(40),
              right: moderateVerticalScale(2),
            }}>
            <Icon
              name={'close-circle'}
              size={moderateVerticalScale(22)}
              type="material-community"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              containerStyle={{
                borderRadius: 100,
                padding: moderateVerticalScale(5),
                // alignSelf: 'center',
              }}
              pressableProps={{
                android_ripple: {borderless: true, color: '#00000013'},
              }}
              color={colors.primary + 'bb'}
              onPress={clearInput}
            />
          </View>
        )}
      </View>

      {icon && !Loader && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={icon!!}
            size={moderateVerticalScale(28)}
            type="material-community"
            style={{justifyContent: 'center', alignItems: 'center'}}
            containerStyle={{
              borderRadius: 100,
              padding: moderateVerticalScale(5),
              alignSelf: 'center',
            }}
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
          size={moderateVerticalScale(28)}
          style={{padding: moderateVerticalScale(5)}}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});
