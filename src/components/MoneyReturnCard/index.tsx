import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { SCREEN_WIDTH } from '../../constants';
import { colors } from '../../theme';

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

export default function MoneyReturnCard({
  name,
  amount,
  order = [],
  onReturn,
  paid,
}: {
  name: string;
  amount: number;
  order: orderListType[];
  onReturn: () => void;
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
            fontFamily: 'Poppins-Bold',
            fontSize: moderateVerticalScale(18),
            flex: 1
          }}
        />
        <TouchableOpacity
          onPress={onReturn}
          style={{
            ...styles.cardDataContainer2,
            borderRadius: 5,
            backgroundColor: colors.primary,
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
            label={'Return'}
            textStyle={{ ...styles.cardDataText, color: colors.background }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.cardInnerContainer,
          padding: 5,
        }}>
        <MyText
          label={'Amount To Be Return'}
          size={'title'}
          textStyle={{ fontFamily: 'Poppins-Bold' }}
        />
        <MyText
          label={'Rs. ' + amount}
          size={'subHeading'}
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
    borderRadius: moderateVerticalScale(5),
    paddingHorizontal: width * 0.02,
    backgroundColor: colors.background,
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
