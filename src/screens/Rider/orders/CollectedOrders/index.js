import {useMutation} from '@apollo/client';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {MyText, OrderCard} from '../../../../components';
import {SCREEN_HEIGHT} from '../../../../constants';
import {
  getReturnMoneyData,
  revertCollection,
  toggleFinishCollection,
} from '../../../../features/riderOrders/riderOrderSlice';
import {UPDATE_ORDER} from '../../../../graphQL/mutation/order.mutation';
import {colors} from '../../../../theme';

export default function CollectedOrders({navigation}) {
  const [UpdateOrder, {loading}] = useMutation(UPDATE_ORDER);
  const reduxData = useSelector(store => store);
  let orders = reduxData.riderOrder.orders;
  const dispatch = useDispatch();

  const updateOrder = async finalOrders => {
    const update = await UpdateOrder({
      variables: {
        input: finalOrders,
      },
    });
    dispatch(toggleFinishCollection(true));
    dispatch(getReturnMoneyData());
    navigation.navigate('Purchasing_List');
  };

  const finishCollection = () => {
    let finalOrders = [];
    orders.map(item => {
      var obj = {
        id: item.id,
        status: item.status,
        paidAmount: Number(item.paidAmount),
      };
      item?.riderId && (obj['riderId'] = item.riderId);
      finalOrders.push(obj);
    });
    Alert.alert('Confirmation', 'Are you sure you want to Finish Collection?', [
      {text: 'Yes', onPress: () => updateOrder(finalOrders)},
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
        data={
          orders.some(val => val.status == 'PAID' && val.returned == false)
            ? orders
            : []
        }
        renderItem={({item}) =>
          item.status == 'PAID' && (
            <OrderCard
              name={item.User.firstName + ' ' + item.User.lastName}
              amount={item.totalAmount}
              order={item.OrderItems}
              paid={item.status}
              paidAmount={item?.paidAmount}
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
        disabled={
          !orders.some(val => val.status == 'PAID' && val.returned == false)
        }
        style={{
          width: '95%',
          alignItems: 'center',
          justifyContent: 'center',
          height: moderateVerticalScale(50),
          backgroundColor: orders.some(
            val => val.status == 'PAID' && val.returned == false,
          )
            ? colors.primary
            : '#ccc',
          marginVertical: 10,
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
