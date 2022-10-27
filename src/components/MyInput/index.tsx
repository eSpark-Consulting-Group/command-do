import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

export default function MyInput({label}: {label: string}) {
  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
      <MyText
        label={label}
        size={SCREEN_HEIGHT * 0.028}
        textStyle={{paddingBottom: 10}}
      />
      <TextInput
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
