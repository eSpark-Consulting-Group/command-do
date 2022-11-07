import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MyText, OrderCard} from '../../../../components';
import {SCREEN_HEIGHT} from '../../../../constants';
import {revertCollection} from '../../../../features/riderOrders/riderOrderSlice';
import {colors} from '../../../../theme';

export default function CollectedOrders({navigation}) {
  const reduxData = useSelector(store => store);
  let orders = reduxData.riderOrder.orders;
  const dispatch = useDispatch();

  const finishCollection = () => {
    Alert.alert('Confirmation', 'Are you sure you want to Finish Collection?', [
      {text: 'Yes', onPress: () => navigation.navigate('Purchasing_List')},
      {text: 'No', style: 'cancel'},
    ]);
  };

  const revertOrder = id => {
    dispatch(revertCollection(id));
  };

  const revertConfirmation = id => {
    console.log();
    Alert.alert(
      'Confirmation',
      'Are you sure you want to revert the Collection?',
      [
        {
          text: 'Yes',
          onPress: () => revertOrder(id),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={orders.some(val => val.status == 'PAID') ? orders : []}
        renderItem={({item}) =>
          item.status == 'PAID' && (
            <OrderCard
              name={item.User.firstName + ' ' + item.User.lastName}
              amount={item.totalAmount}
              order={item.OrderItems}
              paid={item.status}
              onRevert={() => revertConfirmation(item.id)}
            />
          )
        }
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: SCREEN_HEIGHT * 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyText label={'No Orders Collected Yet'} size={'subHeading'} />
          </View>
        }
      />
      <TouchableOpacity
        onPress={finishCollection}
        disabled={!orders.some(val => val.status == 'PAID')}
        style={{
          width: '95%',
          alignItems: 'center',
          backgroundColor: orders.some(val => val.status == 'PAID')
            ? colors.primary
            : '#ccc',
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
            color: colors.text_inverse,
          }}>
          Finish Collection
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
