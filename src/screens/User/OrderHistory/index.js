import {useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MyHeader, MyText, OrderHistoryCard} from '../../../components';
import {SCREEN_HEIGHT} from '../../../constants';
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
      <MyHeader
        onPressLeft={() => navigation?.goBack()}
        leftIcon="arrow-back"
        title="Order History"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
        }}
      />
      <FlatList
        data={orderHistory}
        style={{width: '100%', top: SCREEN_HEIGHT * 0.006}}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchOrders} />
        }
        renderItem={
          ({item}) => (
            <OrderHistoryCard
              name={item.User.firstName + ' ' + item.User.lastName}
              amount={item.totalAmount}
              order={item.OrderItems}
              paid={item.status}
              paidAmount={item.paidAmount}
              remainingAmount={item.remainingAmount}
            />
          )
          // <OrderCard
          //   name={item.User.firstName + ' ' + item.User.lastName}
          //   amount={item.totalAmount}
          //   order={item.OrderItems}
          //   paid={item.status}
          //   onCollect={() => openOverlay(item.totalAmount, item.id)}
          // />
        }
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
      {/* <OrderHistoryCard
        name="Wirad Ali"
        amount={250}
        paid={'PAID'}
        order={[{Item: {name: 'Chicken Biryani'}, quantity: 2}]}
      /> */}
    </View>
  );
}
