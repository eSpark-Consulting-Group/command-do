import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

export default function MyInput({
  label,
  value,
  numericKeyboard = false,
  canEdit = true,
  handleChangeText,
  onSubmit,
}: {
  label?: string;
  value?: string;
  numericKeyboard?: boolean;
  canEdit?: boolean;
  handleChangeText?: (text: string) => void;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
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
          textStyle={{paddingBottom: 10}}
        />
      )}
      <TextInput
        value={value}
        onSubmitEditing={onSubmit}
        onChangeText={handleChangeText}
        placeholder="Enter Text in TextInput"
        keyboardType={numericKeyboard ? 'numeric' : 'default'}
        editable={canEdit}
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInputStyleClass: {
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    width: '100%',
    fontSize: moderateVerticalScale(14),
    height: moderateVerticalScale(40),
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
