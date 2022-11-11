import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {CollectionModal, MyText, OrderCard} from '../../../../components';
import {SCREEN_HEIGHT} from '../../../../constants';
import {
  collectAmouunt,
  getOrders,
} from '../../../../features/riderOrders/riderOrderSlice';
import {ALL_ORDERS} from '../../../../graphQL/query/orders.query';
import {colors} from '../../../../theme';

export default function CurrentOrders({navigation}) {
  const [GetAllOrders, {loading}] = useLazyQuery(ALL_ORDERS);
  const dispatch = useDispatch();
  const riderOrder = useSelector(store => store.riderOrder);
  const userData = useSelector(store => store.userInfo?.userData);
  let riderId = userData?.id;
  let orders = riderOrder?.orders;
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log('Date', new Date().toString());
    fetchOrders()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const fetchOrders = async () => {
    const orders = await GetAllOrders({
      variables: {
        getOrderInput: {
          createdAt: '2022-11-06T16:08:34.323Z',
        },
      },
    });
    dispatch(getOrders(orders.data.getAllOrders.data));
    console.log('orders.data', orders.data.getAllOrders.data);
  };

  const openOverlay = (val, id) => {
    setShowModal(true);
    setAmount(val);
    setId(id);
  };
  const closeOverlay = () => {
    setShowModal(false);
    setAmount('');
    setId(null);
  };

  const onCollection = amount => {
    console.log('Amount', amount);
    dispatch(collectAmouunt({id, amount, riderId}));
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={orders.some(val => val.status == 'UNPAID') ? orders : []}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchOrders} />
        }
        renderItem={({item}) =>
          item.status == 'UNPAID' && (
            <OrderCard
              name={item.User.firstName + ' ' + item.User.lastName}
              amount={item.totalAmount}
              order={item.OrderItems}
              paid={item.status}
              onCollect={() => openOverlay(item.totalAmount, item.id)}
            />
          )
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
      {showModal && (
        <CollectionModal
          isVisible={showModal}
          totAmount={amount}
          closeModal={closeOverlay}
          onCollected={amount => onCollection(amount)}
        />
      )}
    </View>
  );
}
