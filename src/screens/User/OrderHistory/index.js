import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SectionList,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {GapView, MyHeader, MyText, OrderHistoryCard} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {getOrderHistory} from '../../../features/userInfo/userInfoSlice';
import {ALL_ORDERS} from '../../../graphQL/query/orders.query';
import {colors} from '../../../theme';

export default function OrderHistory() {
  const [GetAllOrders, {loading}] = useLazyQuery(ALL_ORDERS);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const reduxData = useSelector(store => store);
  let orderHistory = reduxData.userInfo.orders;
  let userId = reduxData.userInfo.userData.id;
  const fetchOrders = async () => {
    console.log('UserID', userId);
    const orders = await GetAllOrders({
      variables: {
        getOrderInput: {
          userId: userId,
        },
      },
    });
    dispatch(getOrderHistory(orders.data.getAllOrders.data));
    // console.log('orders.data', orderHistory);
  };
  useEffect(() => {
    fetchOrders()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <SectionList
        sections={orderHistory}
        contentContainerStyle={{
          paddingVertical: 5,
          alignItems: 'center',
        }}
        renderItem={({item}) => (
          <OrderHistoryCard
            name={item.User.firstName + ' ' + item.User.lastName}
            amount={item.totalAmount}
            order={item.OrderItems}
            paid={item.status}
            paidAmount={item.paidAmount}
            remainingAmount={item.remainingAmount}
          />
        )}
        SectionSeparatorComponent={() => <GapView mode="vertical" length={2} />}
        renderSectionHeader={({section}) => (
          <MyText
            textStyle={{
              width: SCREEN_WIDTH * 1,
              textAlign: 'center',
              // paddingVertical: 2,
              fontSize: 22,
              color: colors.text_inverse,
              backgroundColor: colors.primary,
              elevation: 1,
            }}
            label={section.title}
          />
        )}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: SCREEN_HEIGHT * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText label={'No Orders'} size={'subHeading'} />
            </View>
          )
        }
      />
    </View>
  );
}
