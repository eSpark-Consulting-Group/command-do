import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';
import GapView from '../GapView';

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

export default function OrderCard({
  name,
  amount,
  paidAmount,
  order = [],
  onCollect,
  onRevert,
  paid,
}: {
  name: string;
  amount: number;
  paidAmount: number;
  order: orderListType[];
  onCollect: () => void;
  onRevert: () => void;
  paid: string;
}) {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
          borderBottomWidth: 1,
        }}>
        <MyText
          label={name}
          textStyle={{
            ...styles.cardDataText,
            fontSize: moderateVerticalScale(20),
            maxWidth: SCREEN_WIDTH * 0.7,
          }}
        />
        <TouchableOpacity
          onPress={paid == 'UNPAID' ? onCollect : onRevert}
          style={{
            ...styles.cardDataContainer2,
            borderRadius: 5,
            backgroundColor: colors.primary,
            elevation: 2,
            padding: 5,
          }}>
          <MyText
            label={paid == 'UNPAID' ? 'Collect' : 'Revert'}
            textStyle={{...styles.cardDataText, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, padding: 5}}>
        <View style={{...styles.cardInnerContainer, marginBottom: 4}}>
          <MyText
            label={'Order'}
            size={'title'}
            textStyle={{
              fontFamily: 'Poppins-Bold',
              textDecorationLine: 'underline',
            }}
          />
          <MyText
            label={'Quantity'}
            size={'title'}
            textStyle={{
              fontFamily: 'Poppins-Bold',
              textDecorationLine: 'underline',
            }}
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
      {paid == 'PAID' && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.95,
    paddingVertical: 5,
    borderRadius: moderateVerticalScale(5),
    paddingHorizontal: width * 0.02,
    backgroundColor: colors.background,
    elevation: 2,
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
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  cardDataMoreText: {
    fontSize: width * 0.024,
    fontFamily: 'Poppins-Bold',
    opacity: 0.5,
  },
});
