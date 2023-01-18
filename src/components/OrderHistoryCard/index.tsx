import { Icon } from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { colors } from '../../theme';
import GapView from '../GapView';

import MyText from '../Text';

const { width, height } = Dimensions.get('window');
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
  paidAmount,
  remainingAmount,
  onDelete,
  returned,
}: {
  name: string;
  amount: number;
  order: orderListType[];
  onCollect: () => void;
  onRevert: () => void;
  onDelete: () => void;
  paid: string;
  paidAmount: number;
  remainingAmount: number;
  returned: boolean;
}) {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
          borderBottomWidth: 1,
        }}>
        <MyText label={name} size={'title'} textStyle={{ fontFamily: 'Poppins-Bold', flex: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {paidAmount == 0 && (
            <>
              <TouchableOpacity onPress={onDelete}>
                <Icon
                  size={moderateVerticalScale(24)}
                  name="trash"
                  type="foundation"
                />
              </TouchableOpacity>
              <GapView mode="horizontal" length={moderateVerticalScale(10)} />
            </>
          )}
          <GapView mode="horizontal" length={moderateVerticalScale(10)} />
          <View
            style={{
              ...styles.cardDataContainer2,
              borderRadius: 5,
              backgroundColor:
                paidAmount == 0
                  ? '#F0AD4E'
                  : remainingAmount > 0 && returned == false
                    ? '#D9534F'
                    : '#5CB85C',
              padding: 5,
              elevation: moderateVerticalScale(2),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: moderateVerticalScale(1),
              },
              shadowOpacity: moderateVerticalScale(0.20),
              shadowRadius: moderateVerticalScale(1.41),
            }}>
            <MyText
              label={
                paidAmount == 0
                  ? 'Not Paid'
                  : remainingAmount > 0 && returned == false
                    ? 'Not Received'
                    : 'Received'
              }
              size={'subTitle'}
              textStyle={{ ...styles.cardDataText, color: '#fff' }}
            />
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, padding: 5 }}>
        <View style={{ ...styles.cardInnerContainer, marginBottom: 4 }}>
          <MyText
            label={'Order'}
            size={'title'}
            textStyle={{ fontFamily: 'Poppins-Bold' , textDecorationLine: 'underline'}}
          />
          <MyText
            label={'Quantity'}
            size={'title'}
            textStyle={{ fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}
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
                textStyle={{ fontFamily: 'Poppins-Bold' }}
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
          textStyle={{ fontFamily: 'Poppins-Bold' }}
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
          padding: 5,
        }}>
        <MyText
          label={'Paid Amount'}
          size={'title'}
          textStyle={{ fontFamily: 'Poppins-Bold' }}
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
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
        }}>
        <MyText
          label={'Remaining Amount'}
          size={'title'}
          textStyle={{ fontFamily: 'Poppins-Bold' }}
        />
        <MyText
          label={'Rs. ' + remainingAmount}
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
    backgroundColor: colors.text_inverse,
    marginVertical: 5,
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
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
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  cardDataMoreText: {
    fontSize: width * 0.024,
    fontFamily: 'Poppins-Bold',
    opacity: 0.5,
  },
});
