import { placeholder } from '@babel/types';
import { Icon } from '@rneui/themed';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

import { SCREEN_HEIGHT } from '../../constants';
import { colors } from '../../theme';
import MyText from '../Text';

export default function MyInput({
  label,
  value,
  numericKeyboard = false,
  canEdit = true,
  bordered = true,
  placeholderValue,
  handleChangeText,
  onSubmit,
  clearInput,
}: {
  label?: string;
  value?: string;
  numericKeyboard?: boolean;
  canEdit?: boolean;
  bordered?: boolean;
  placeholderValue?: string;
  handleChangeText?: (text: string) => void;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  clearInput?: () => void;
}) {
  const containerStyles = {
    padding: label ? 10 : 0,
    flex: label ? 0 : 1,
  };

  return (
    <View style={containerStyles}>
      {label && (
        <MyText
          label={label}
          size={SCREEN_HEIGHT * 0.028}
          textStyle={{ paddingBottom: 10 }}
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          borderRadius: 10,
          padding: 1,
        }}>
        <TextInput
          value={value}
          onSubmitEditing={onSubmit}
          onChangeText={handleChangeText}
          placeholder={placeholderValue ?? `Search "Biryani...`}
          keyboardType={numericKeyboard ? 'numeric' : 'default'}
          editable={canEdit}
          underlineColorAndroid="transparent"
          style={bordered ? styles.textInputBordered : styles.textInputSimple}
        />
        {value && !bordered && (
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
            }}
            pressableProps={{
              android_ripple: { borderless: true, color: '#00000013' },
            }}
            color={colors.primary + 'bb'}
            onPress={clearInput}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputSimple: {
    flex: 1,
    fontSize: moderateVerticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  textInputBordered: {
    flex: 1,
    fontSize: moderateVerticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary,
  },
});
