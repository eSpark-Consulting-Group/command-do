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
  onRevert,
  paid,
}: {
  name: string;
  amount: number;
  order: orderListType[];
  onCollect: () => void;
  onRevert: () => void;
  paid: false;
}) {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
          borderBottomWidth: 1,
        }}>
        <MyText label={name} size={'title'} textStyle={styles.cardDataText} />
        <TouchableOpacity
          onPress={paid ? onRevert : onCollect}
          style={{
            ...styles.cardDataContainer2,
            borderRadius: 5,
            backgroundColor: '#14D6C7',
            elevation: 5,
            paddingVertical: 2,
          }}>
          <Text style={{...styles.cardDataText, color: '#fff'}}>
            {paid ? 'Revert' : 'Collect'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, padding: 5}}>
        <View style={{...styles.cardInnerContainer, marginBottom: 4}}>
          <MyText
            label={'Order'}
            size={'title'}
            textStyle={{fontWeight: 'bold'}}
          />
          <MyText
            label={'Quantity'}
            size={'title'}
            textStyle={{fontWeight: 'bold'}}
          />
        </View>
        {order.length > 0 &&
          order.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.cardInnerContainer,
                paddingVertical: 2,
              }}>
              <MyText
                label={item.item}
                size={'subTitle'}
                textStyle={{fontWeight: 'bold'}}
              />
              <MyText
                label={item.qty}
                size={'subTitle'}
                textStyle={{
                  fontWeight: 'bold',
                  width: width * 0.12,
                  textAlign: 'center',
                }}
              />
            </View>
          ))}
      </View>
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
        }}>
        <MyText
          label={'Total'}
          size={'title'}
          textStyle={{fontWeight: 'bold'}}
        />
        <MyText
          label={'Rs. 2000'}
          size={'title'}
          textStyle={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
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
    justifyContent: 'space-between',
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
