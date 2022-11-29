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
        <MyText label={name} size={'title'} textStyle={styles.cardDataText} />
        <TouchableOpacity
          onPress={onReturn}
          style={{
            ...styles.cardDataContainer2,
            borderRadius: 5,
            backgroundColor: colors.primary,
            elevation: 5,
            padding: 5,
          }}>
          <MyText
            label={'Return'}
            textStyle={{...styles.cardDataText, color: colors.background}}
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
          textStyle={{fontFamily: 'Poppins-Bold'}}
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
    borderRadius: 5,
    paddingHorizontal: width * 0.02,
    backgroundColor: colors.background,
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
