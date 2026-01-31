import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  BlurBackground,
  CollectionModal,
  MoneyReturnCard,
  MyHeader,
} from '../../../components';
import { SCREEN_HEIGHT } from '../../../constants';
import {
  toggleFinishCollection,
  toggleOrderPurchased,
} from '../../../features/riderOrders/riderOrderSlice';
import { UPDATE_ORDER } from '../../../graphQL/mutation/order.mutation';
import { ALL_ORDERS } from '../../../graphQL/query/orders.query';
import { colors } from '../../../theme';

export default function MoneyReturn({ navigation }) {
  const dispatch = useDispatch();
  const [GetAllOrders, { data, loading: loadOrders }] =
    useLazyQuery(ALL_ORDERS);
  const [UpdateOrder, { loading }] = useMutation(UPDATE_ORDER);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    GetAllOrders({
      variables: {
        getOrderInput: {},
      },
    });
  };

  let order = useMemo(
    () =>
      data?.getAllOrders?.data?.filter(item => {
        return item.returned == false && item.status == 'PAID';
      }),
    [data?.getAllOrders?.data],
  );

  useEffect(() => {
    if (order?.length < 1 && order !== undefined) {
      Alert.alert('No Orders', 'No return orders left.!', [
        {
          text: 'Back to Orders',
          onPress: () => navigateToOrders(),
        },
      ]);
    }
  }, [order?.length]);

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
    order.filter(item => {
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
        backgroundColor: colors.background,
      }}>
      <MyHeader
        title="Return Money"
        leftIcon="arrow-back"
        onPressLeft={() => navigation.goBack()}
        titleStyle={{ fontFamily: 'Poppins-Bold' }}
      />
      <FlatList
        data={order}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
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
            <MoneyReturnCard
              name={item?.User?.firstName + ' ' + item?.User?.lastName}
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
      <CollectionModal
        type={'return'}
        isVisible={showModal}
        totAmount={amount}
        closeModal={closeOverlay}
        isLoading={loading}
        onCollected={amount => onCollection(amount)}
      />
      <BlurBackground show={showModal} />
    </View>
  );
}
