import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';

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
        <Text style={styles.cardDataText}>{itemName}</Text>
      </View>
      <View style={styles.cardDataContainer2}>
        <Text style={styles.cardDataText}>{quantity}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 0,
    width: '95%',
    marginVertical: 5,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 10,
    elevation: 2,
  },
  cardDataContainer: {width: SCREEN_WIDTH * 0.5},
  cardDataContainer2: {width: SCREEN_WIDTH * 0.2, alignItems: 'center'},
  cardDataText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});
