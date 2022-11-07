import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
  const reduxData = useSelector(store => store);
  let orders = reduxData.riderOrder.orders;
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await GetAllOrders({
        variables: {
          createdAt:
            'Tue Nov 01 2022 18:55:20 GMT+0500 (Pakistan Standard Time)',
        },
      });
      dispatch(getOrders(orders.data.getAllOrders.data));
    };
    fetchOrders()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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

  const onCollection = () => {
    dispatch(collectAmouunt(id));
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={orders.some(val => val.status == 'UNPAID') ? orders : []}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
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
                height: SCREEN_HEIGHT * 0.7,
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
          onCollected={onCollection}
        />
      )}
    </View>
  );
}
