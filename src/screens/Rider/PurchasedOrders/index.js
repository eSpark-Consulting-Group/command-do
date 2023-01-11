import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { useLazyQuery } from '@apollo/client';

import { MyHeader, MyText, OrderHistoryCard } from '../../../components';
import { SCREEN_HEIGHT } from '../../../constants';

import { ALL_ORDERS } from '../../../graphQL/query/orders.query';
import { colors } from '../../../theme';
import { RefreshControl } from 'react-native';

export default function PurchasedOrders({ navigation, route }) {
  const currDate = new Date().setUTCHours(0);

  const [GetAllOrders, { data, loading: loadOrders }] =
    useLazyQuery(ALL_ORDERS);

  const [userId, setUserId] = useState(route?.params?.userId);
  const Id = route?.params?.userId;

  useEffect(() => {
    fetchOrders(userId);
  }, [userId]);

  useEffect(() => {
    setUserId(Id);
  }, [Id]);

  const fetchOrders = async id => {
    console.log('id', id);
    GetAllOrders({
      variables: {
        getOrderInput: { createdAt: currDate, userId: id },
      },
    });
  };

  let order = useMemo(
    () =>
      data?.getAllOrders?.data?.filter(item => {
        return item.status == 'PAID';
      }),
    [data?.getAllOrders?.data],
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <MyHeader
        title="Purchased Orders"
        leftIcon="arrow-back"
        icon={userId ? 'search-off' : 'person-search'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() =>
          userId
            ? setUserId(undefined)
            : navigation.navigate('SearchItem', {
                navigateTo: 'PurchasedOrders',
              })
        }
        titleStyle={{ fontFamily: 'Poppins-Bold' }}
      />
      <FlatList
        data={order}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={
          !userId ? (
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                fetchOrders();
              }}
            />
          ) : null
        }
        renderItem={({ item }) =>
          loadOrders ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.8,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <OrderHistoryCard
              name={item.User.firstName + ' ' + item.User.lastName}
              amount={item.totalAmount}
              order={item.OrderItems}
              paid={item.status}
              paidAmount={item.paidAmount}
              remainingAmount={item.remainingAmount}
              onDelete={() => delAlert(item.id)}
              returned={item.returned}
            />
          )
        }
        ListEmptyComponent={
          loadOrders ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.8,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText label={'No Orders Received'} size={'heading'} />
            </View>
          )
        }
      />
    </View>
  );
}
