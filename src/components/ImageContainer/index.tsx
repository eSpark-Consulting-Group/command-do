import {StyleSheet, View} from 'react-native';
import React from 'react';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';
import {TouchRipple} from '../';

export default function ImageContainer() {
  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
      <MyText
        label="Image"
        size={SCREEN_HEIGHT * 0.028}
        textStyle={{paddingBottom: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'teal',
            borderRadius: 5,
          }}
        />
        <TouchRipple darkRipple style={styles.btnStyle}>
          <MyText
            label={'Upload Image'}
            textStyle={{color: colors.text_normal, textAlignVertical: 'center'}}
          />
        </TouchRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: 20,
    backgroundColor: colors.background,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
