import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';

export default function BottomButton({
  enabled,
  label,
  count,
  totalCount,
  onPress,
}: {
  enabled?: boolean;
  label: string;
  count?: number;
  totalCount?: number;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        disabled={!enabled}
        style={{
          ...styles.bottomButton,
          backgroundColor: enabled ? colors.primary : 'silver',
        }}
        onPress={onPress}>
        {/* <View /> */}
        <MyText
          label={label}
          size={SCREEN_HEIGHT * 0.032}
          textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
        />
        <MyText
          label={`${count}/${totalCount}`}
          size={SCREEN_HEIGHT * 0.032}
          textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
