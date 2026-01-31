import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {FlatList, View, ActivityIndicator, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';

import {
  BackButtonHandler,
  BlurBackground,
  CollectionModal,
  MyText,
  OrderCard,
} from '../../../../components';
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
  const [isConnected, setIsConnected] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isConnected) {
      fetchOrders();
    }
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async () => {
    const currDate = new Date().setUTCHours(0);
    const newOrders = await GetAllOrders({
      variables: {
        getOrderInput: {
          createdAt: currDate,
        },
      },
    });
    dispatch(
      getOrders(
        newOrders?.data?.getAllOrders?.data?.map(value => {
          var order = orders?.find(redOrder => redOrder?.id == value?.id);
          console.log(' order: ', {
            ...value,
            status: order?.status,
            paidAmount: order?.paidAmount,
            riderId: order?.riderId,
            amountCollected: order?.amountCollected
          });
          if (order) {
            return {
              ...value,
              status: order?.status,
              paidAmount: order?.paidAmount,
              riderId: order?.riderId,
              amountCollected: order?.amountCollected
            };
          } else {
            return value;
          }
        }),
      ),
    );
  };

  const openOverlay = (val, id) => {
    setShowModal(true);
    navigation.navigate('Orders', {isModal: true});
    setAmount(val);
    setId(id);
  };
  const closeOverlay = () => {
    setShowModal(false);
    navigation.navigate('Orders', {isModal: false});
    setAmount('');
    setId(null);
  };

  const onCollection = amount => {
    dispatch(collectAmouunt({id, amount, riderId}));
    navigation.navigate('Orders', {isModal: false});
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {isFocused && <BackButtonHandler />}
      <FlatList
        data={orders?.some(val => val.status == 'UNPAID') ? orders : []}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchOrders} />
        }
        renderItem={({item}) =>
          loading ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            item?.status == 'UNPAID' && (
              <OrderCard
                name={item?.User.firstName + ' ' + item?.User.lastName}
                amount={item?.totalAmount}
                order={item?.OrderItems}
                paid={item?.status}
                onCollect={() => openOverlay(item?.totalAmount, item?.id)}
              />
            )
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
      <CollectionModal
        isVisible={showModal}
        totAmount={amount}
        closeModal={closeOverlay}
        onCollected={amount => onCollection(amount)}
      />
      <BlurBackground show={showModal} />
    </View>
  );
}
