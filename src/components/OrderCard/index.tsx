import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MyText from '../Text';

const {width, height} = Dimensions.get('window');

type orderListType = {
  item: string;
  qty: number;
};

export default function OrderCard({
  name,
  amount,
  order = [],
  onCollect,
  paid,
}: {
  name: string;
  amount: number;
  order: orderListType[];
  onCollect: () => void;
  paid: false;
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInnerContainer}>
        <View style={styles.cardDataContainer}>
          <MyText label={name} size={'title'} textStyle={styles.cardDataText} />
        </View>
        <View style={styles.cardDataContainer}>
          {order.length > 0 &&
            order.map(
              (item, index) =>
                index < 2 && (
                  <Text key={index} style={styles.cardDataText}>
                    {item.qty}x {item.item}
                  </Text>
                ),
            )}
          {order.length > 2 && (
            <TouchableOpacity>
              <Text style={styles.cardDataMoreText}>(tap to see more)</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.cardInnerContainer}>
        <View style={styles.cardDataContainer2}>
          <Text style={styles.cardDataText}>Rs {amount}</Text>
        </View>
        <TouchableOpacity
          onPress={onCollect}
          style={{
            ...styles.cardDataContainer2,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#11a79c',
            backgroundColor: '#11a79c',
          }}>
          <Text style={{...styles.cardDataText, color: '#fff'}}>
            {paid ? 'Revert' : 'Collect'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#fff',
    elevation: 5,
    marginVertical: 5,
  },
  cardInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDataContainer: {
    width: width * 0.2,
    alignItems: 'center',
  },
  cardDataContainer2: {
    width: width * 0.18,
    alignItems: 'center',
  },
  cardDataText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDataMoreText: {
    fontSize: width * 0.024,
    fontWeight: 'bold',
    opacity: 0.5,
  },
});
