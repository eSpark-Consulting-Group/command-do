import {useLazyQuery, useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  CollectionModal,
  MoneyReturnCard,
  MyHeader,
  MyText,
} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {
  toggleFinishCollection,
  toggleOrderPurchased,
} from '../../../features/riderOrders/riderOrderSlice';
import {UPDATE_ORDER} from '../../../graphQL/mutation/order.mutation';
import {ALL_ORDERS} from '../../../graphQL/query/orders.query';
import {colors} from '../../../theme';

export default function MoneyReturn({navigation}) {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([false]);
  const [GetAllOrders, {loading: loadOrders}] = useLazyQuery(ALL_ORDERS);
  const [UpdateOrder, {loading}] = useMutation(UPDATE_ORDER);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const currDate = new Date().setUTCHours(0);
    console.log('Date', currDate);
    const orders = await GetAllOrders({
      variables: {
        getOrderInput: {
          createdAt: currDate,
        },
      },
    });
    console.log('orders.data', orders?.data?.getAllOrders?.data);
    let order = orders?.data?.getAllOrders?.data?.filter(item => {
      return item.returned == false;
    });
    if (order?.length < 1) {
      Alert.alert('Alert', 'No return orders left.!', [
        {
          text: 'Back to Orders',
          onPress: () => navigateToOrders(),
        },
      ]);
    }
    console.log('orders', order);
    setOrders(order);
  };

  const navigateToOrders = () => {
    navigation.navigate('Orders');
    dispatch(toggleOrderPurchased(false));
    dispatch(toggleFinishCollection(false));
  };

  const openOverlay = item => {
    setShowModal(true);
    setAmount(item.remainingAmount);
    setId(item.id);
  };

  const closeOverlay = () => {
    setShowModal(false);
    setAmount('');
    setId(null);
  };

  const onCollection = async amount => {
    let returnMoneyOrder = {};
    orders.filter(item => {
      if (item.id == id) {
        returnMoneyOrder = item;
      }
    });
    console.log('returnMoneyOrder', returnMoneyOrder);
    const update = await UpdateOrder({
      variables: {
        input: [
          {
            id: returnMoneyOrder.id,
            paidAmount: returnMoneyOrder.paidAmount,
            riderId: returnMoneyOrder.riderId,
            status: returnMoneyOrder.status,
          },
        ],
        returnAmount: Number(amount),
        type: 'RETURN',
      },
    });
    console.log('Retun Order', update);
    fetchOrders();
    setShowModal(false);
    setAmount('');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <MyHeader
        title="Return Money"
        titleStyle={{fontFamily: 'Poppins-Bold'}}
      />
      <FlatList
        data={orders}
        renderItem={({item}) =>
          loadOrders ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.8,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <MoneyReturnCard
              name={item?.User?.firstName}
              amount={item?.remainingAmount}
              onReturn={() => openOverlay(item)}
            />
          )
        }
        ListEmptyComponent={
          loadOrders && (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.8,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          )
        }
      />
      {showModal && (
        <CollectionModal
          type={'return'}
          isVisible={showModal}
          totAmount={amount}
          closeModal={closeOverlay}
          isLoading={loading}
          onCollected={amount => onCollection(amount)}
        />
      )}
    </View>
  );
}
