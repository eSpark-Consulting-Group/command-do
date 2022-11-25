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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: 2,
            paddingHorizontal: 20,
          }}>
          <MyText
            label={label}
            size={20}
            textStyle={{
              color: colors.text_inverse,
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}
          />
          <MyText
            label={`${count}/${totalCount}`}
            size={20}
            textStyle={{
              color: colors.text_inverse,
              fontWeight: 'bold',
              textAlignVertical: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    flex: 1,
    width: '95%',
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
