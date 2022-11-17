import {type} from 'os';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../theme';

import MyText from '../Text';

const {width, height} = Dimensions.get('window');
type itemData = {
  name: string;
  price: number;
  id: number;
};

type orderListType = {
  Item: itemData;
  quantity: number;
};

export default function OrderHistoryCard({
  name,
  amount,
  order = [],
  onCollect,
  onRevert,
  paid,
  paidAmount,
  remainingAmount,
}: {
  name: string;
  amount: number;
  order: orderListType[];
  onCollect: () => void;
  onRevert: () => void;
  paid: string;
  paidAmount: number;
  remainingAmount: number;
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
        <View
          style={{
            ...styles.cardDataContainer2,
            borderRadius: 5,
            backgroundColor:
              paidAmount == 0
                ? '#F0AD4E'
                : remainingAmount > 0
                ? '#D9534F'
                : '#5CB85C',
            elevation: 5,
            paddingHorizontal: 3,
            paddingVertical: 1,
          }}>
          <MyText
            label={
              paidAmount == 0
                ? 'Not Paid'
                : remainingAmount > 0
                ? 'Not Received'
                : 'Received'
            }
            textStyle={{...styles.cardDataText, color: '#fff'}}
          />
        </View>
      </View>
      <View style={{borderBottomWidth: 1, padding: 5}}>
        <View style={{...styles.cardInnerContainer, marginBottom: 4}}>
          <MyText
            label={'Order'}
            size={'title'}
            textStyle={{fontFamily: 'Poppins-Bold'}}
          />
          <MyText
            label={'Quantity'}
            size={'title'}
            textStyle={{fontFamily: 'Poppins-Bold'}}
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
                label={item.Item.name}
                size={'subTitle'}
                textStyle={{fontFamily: 'Poppins-Bold'}}
              />
              <MyText
                label={item.quantity}
                size={'subTitle'}
                textStyle={{
                  fontFamily: 'Poppins-Bold',
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
          label={'Total Amount'}
          size={'title'}
          textStyle={{fontFamily: 'Poppins-Bold'}}
        />
        <MyText
          label={'Rs. ' + amount}
          size={'title'}
          textStyle={{
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
          }}
        />
      </View>
      <View
        style={{
          ...styles.cardInnerContainer,
          paddingHorizontal: 5,
        }}>
        <MyText
          label={'Paid Amount'}
          size={'title'}
          textStyle={{fontFamily: 'Poppins-Bold'}}
        />
        <MyText
          label={'Rs. ' + paidAmount}
          size={'title'}
          textStyle={{
            fontFamily: 'Poppins-Bold',
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
    alignItems: 'center',
  },
  cardDataText: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  cardDataMoreText: {
    fontSize: width * 0.024,
    fontFamily: 'Poppins-Bold',
    opacity: 0.5,
  },
});
