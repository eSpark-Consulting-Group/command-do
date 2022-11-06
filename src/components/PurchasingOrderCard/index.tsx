import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {CheckBox} from '@rneui/themed';
import {useState} from 'react';
import {colors} from '../../theme';

export default function PurchasingOrderCard({
  itemName,
  qty,
  totalAmount,
  checked,
  onCheck,
}: {
  itemName: string;
  qty: number;
  totalAmount: number;
  checked: boolean;
  onCheck: (val: boolean) => void;
}) {
  // const [check, setCheck] = useState(false);

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
          containerStyle={{height: SCREEN_HEIGHT * 0.06}}
        />
      </View>
      <View style={styles.cardDataContainer}>
        <Text style={styles.cardDataText}>{itemName}</Text>
      </View>
      <View style={styles.cardDataContainer2}>
        <Text style={styles.cardDataText}>{qty}</Text>
      </View>
      <View style={styles.cardDataContainer2}>
        <Text style={styles.cardDataText}>Rs. {totalAmount}</Text>
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
    paddingVertical: 0,
    width: SCREEN_WIDTH * 0.95,
    marginVertical: 5,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 10,
    elevation: 2,
  },
  cardDataContainer: {width: '48%', paddingLeft: '2%'},
  cardDataContainer1: {width: '12%', alignItems: 'center'},
  cardDataContainer2: {width: '20%', alignItems: 'center'},
  cardDataText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});
