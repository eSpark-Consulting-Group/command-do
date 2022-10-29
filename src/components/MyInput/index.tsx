import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

export default function MyInput({
  label,
  value,
  handleChangeText,
}: {
  label?: string;
  value?: string;
  handleChangeText?: (text: string) => void;
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
        onChangeText={handleChangeText}
        placeholder="Enter Text in TextInput"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInputStyleClass: {
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});
