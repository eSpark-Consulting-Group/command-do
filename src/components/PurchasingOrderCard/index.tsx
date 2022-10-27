import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';

export default function PurchasingOrderCard({
  itemName,
  qty,
  totalAmount,
}: {
  itemName: string;
  qty: number;
  totalAmount: number;
}) {
  return (
    <View style={styles.cardContainer}>
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
    paddingHorizontal: 10,
    width: '95%',
    marginVertical: 5,
    height: SCREEN_HEIGHT * 0.08,
    borderRadius: 10,
    elevation: 5,
  },
  cardDataContainer: {width: SCREEN_WIDTH * 0.5},
  cardDataContainer2: {width: SCREEN_WIDTH * 0.18, alignItems: 'center'},
  cardDataText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});
