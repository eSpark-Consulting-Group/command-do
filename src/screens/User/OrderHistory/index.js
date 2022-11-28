import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SectionList,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';

import {GapView, MyHeader, MyText, OrderHistoryCard} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {getOrderHistory} from '../../../features/userInfo/userInfoSlice';
import {ALL_ORDERS} from '../../../graphQL/query/orders.query';
import {colors} from '../../../theme';

export default function OrderHistory() {
  const [GetAllOrders, {loading}] = useLazyQuery(ALL_ORDERS);
  const [ordersData, setOrdersData] = useState([]);
  const dispatch = useDispatch();
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
    const temp = [...orderHistory];
    console.log(
      'kia ha sorted',
      temp?.sort((a, b) => new Date(b.title) - new Date(a.title)),
    );
    setOrdersData(temp?.sort((a, b) => new Date(b.title) - new Date(a.title)));
  };
  useEffect(() => {
    fetchOrders()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <SectionList
        sections={ordersData}
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
              fontSize: 22,
              color: colors.text_inverse,
              backgroundColor: colors.primary,
              elevation: 1,
            }}
            label={section.title}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchOrders} />
        }
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
