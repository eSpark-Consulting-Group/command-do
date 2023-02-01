import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SectionList,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import NetInfo from '@react-native-community/netinfo';

import { GapView, MyText, OrderHistoryCard } from '../../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';
import { ALL_ORDERS } from '../../../graphQL/query/orders.query';
import { colors } from '../../../theme';
import { DELETE_ORDER } from '../../../graphQL/mutation/order.mutation';
import { showMessage } from 'react-native-flash-message';

export default function OrderHistory() {
  const [GetAllOrders, { loading, refetch, data }] = useLazyQuery(ALL_ORDERS);
  const [DeleteOrder, { loading: delLoader, data: delData }] =
    useMutation(DELETE_ORDER);
  const [ordersData, setOrdersData] = useState([]);
  const [isConnected, setIsConnected] = useState(null);
  const reduxData = useSelector(store => store);
  let userId = reduxData.userInfo.userData.id;

  const fetchOrders = async () => {
    console.log('UserID', userId);
    GetAllOrders({
      variables: {
        getOrderInput: {
          userId: userId,
        },
      },
    });
  };

  const delAlert = id => {
    Alert.alert('Delete Order', 'Are you sure you want to Delete', [
      { onPress: () => DelOrder(id), text: 'Yes' },
      { text: 'No' },
    ]);
  };

  const DelOrder = id => {
    console.log('ID', id);
    DeleteOrder({
      variables: {
        deleteOrderId: id,
      },
    }).then(res => {
      if (res.data.deleteOrder.status) {
        showMessage({
          message: res.data.deleteOrder.message,
          type: 'success',
          icon: 'auto',
        });
        refetch();
      } else {
        showMessage({
          message: res.data.deleteOrder.message,
          type: 'danger',
          icon: 'auto',
        });
      }
    });
  };

  useEffect(() => {
    if (isConnected) {
      fetchOrders();
    }
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let order = [];
    data?.getAllOrders?.data?.map(item => {
      order.push({
        title: new Date(item.createdAt).toString().slice(0, 15),
        data: [item],
      });
    });
    const temp = [...order];
    console.log(
      'kia ha sorted',
      temp?.sort((a, b) => new Date(b.title) - new Date(a.title)),
    );
    setOrdersData(temp?.sort((a, b) => new Date(b.title) - new Date(a.title)));
  }, [data?.getAllOrders?.data]);

  return (
    <View style={{ alignItems: 'center' }}>
      <SectionList
        sections={loading || delLoader ? [] : ordersData}
        contentContainerStyle={{
          paddingVertical: 5,
          alignItems: 'center',
        }}
        renderItem={({ item }) => (
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
        )}
        SectionSeparatorComponent={() => <GapView mode="vertical" length={2} />}
        renderSectionHeader={({ section }) => (
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
          loading || delLoader ? (
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
