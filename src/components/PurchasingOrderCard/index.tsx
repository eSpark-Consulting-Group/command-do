import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MyText from '../Text';
import { moderateVerticalScale } from 'react-native-size-matters';

export default function PurchasingOrderCard({
  itemName,
  quantity,
  totalAmount,
}: {
  itemName: string;
  quantity: number;
  totalAmount: number;
}) {
  return (
    <View style={styles.cardContainer}>
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
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
  cardDataContainer: { width: '48%', paddingLeft: '2%' },
  cardDataContainer1: { width: '12%', alignItems: 'center' },
  cardDataContainer2: { width: '25%', alignItems: 'center' },
  cardDataText: {
    fontWeight: '600',
  },
});
