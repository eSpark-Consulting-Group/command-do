import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MyText from '../Text';
import { moderateVerticalScale } from 'react-native-size-matters';
import { CheckBox } from '@rneui/themed';
import { useState } from 'react';
import { colors } from '../../theme';

export default function PurchasingOrderCard({
  checked,
  onCheck,
  itemName,
  quantity,
  totalAmount,
}: {
  itemName: string;
  quantity: number;
  totalAmount: number;
  checked: boolean;
  onCheck: (val: boolean) => void;
}) {
  const [check, setCheck] = useState(false);

  const onChecked = () => {
    onCheck(!checked);
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardDataContainer1}>
        <CheckBox
          checked={checked}
          onPress={onChecked}
          checkedColor={colors.primary}
          containerStyle={{ height: SCREEN_HEIGHT * 0.06 }}
        />
      </View>
      <View style={styles.cardDataContainer}>
        <MyText label={itemName} textStyle={styles.cardDataText} />
      </View>
      <View style={styles.cardDataContainer2}>
        <MyText label={quantity} textStyle={styles.cardDataText} />
      </View>
      <View style={styles.cardDataContainer2}>
        <MyText label={`Rs.  ${totalAmount}`} textStyle={styles.cardDataText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: moderateVerticalScale(7),
    width: SCREEN_WIDTH * 0.95,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
  },
  cardDataContainer: { width: '40%', paddingLeft: '2%' },
  cardDataContainer1: { width: '12%', alignItems: 'center' },
  cardDataContainer2: { width: '25%', alignItems: 'center' },
  cardDataText: {
    fontWeight: '600',
  },
});
