import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

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
        <Button
          title="Upload Image"
          buttonStyle={{
            backgroundColor: colors.background,
            padding: 5,
          }}
          titleStyle={{
            color: '#000000',
            fontFamily: 'sans-serif-medium',
          }}
          containerStyle={{
            marginHorizontal: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.primary,
            elevation: 5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
