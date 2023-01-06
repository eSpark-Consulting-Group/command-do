import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  BlurBackground,
  CollectionModal,
  MoneyReturnCard,
  MyHeader,
  OrderHistoryCard,
  SearchBar,
} from '../../../components';
import { SCREEN_HEIGHT } from '../../../constants';
import {
  toggleFinishCollection,
  toggleOrderPurchased,
} from '../../../features/riderOrders/riderOrderSlice';
import { UPDATE_ORDER } from '../../../graphQL/mutation/order.mutation';
import { ALL_ORDERS } from '../../../graphQL/query/orders.query';
import { colors } from '../../../theme';
import { RefreshControl } from 'react-native';

export default function PurchasedOrders({ navigation }) {
  const dispatch = useDispatch();
  const currDate = new Date().setUTCHours(0);

  const [GetAllOrders, { data, loading: loadOrders }] =
    useLazyQuery(ALL_ORDERS);

  const [UpdateOrder, { loading }] = useMutation(UPDATE_ORDER);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    GetAllOrders({
      variables: {
        getOrderInput: { createdAt: currDate },
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

  const updateSearch = async text => {
    setSearch(text);
  };

  // useEffect(() => {
  //   if (order?.length < 1 && order !== undefined) {
  //     Alert.alert('No Orders', 'No return orders left.!', [
  //       {
  //         text: 'Back to Orders',
  //         onPress: () => navigateToOrders(),
  //       },
  //     ]);
  //   }
  // }, [order?.length]);

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
        title="Purchased Orders"
        leftIcon="arrow-back"
        icon="search"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() =>
          navigation.navigate('SearchItem', {
            navigateTo: 'Add_Form',
          })
        }
        titleStyle={{ fontFamily: 'Poppins-Bold' }}
      />
      {/* <SearchBar
        value={search}
        placeholder={`Search "Aliali"`}
        clearInput={() => setSearch('')}
        handleChangeText={text => setSearch(text)}
        icon="magnify"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => updateSearch(search)}
        onSubmit={() => updateSearch(search)}
      /> */}
      <FlatList
        data={order}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchOrders();
            }}
          />
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
      {/* <CollectionModal
        type={'return'}
        isVisible={showModal}
        totAmount={amount}
        closeModal={closeOverlay}
        isLoading={loading}
        onCollected={amount => onCollection(amount)}
      />
      <BlurBackground show={showModal} /> */}
    </View>
  );
}
