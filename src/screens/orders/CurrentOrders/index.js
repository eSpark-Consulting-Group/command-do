import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {CollectionModal, MyText, OrderCard} from '../../../components';
import {SCREEN_HEIGHT} from '../../../constants';
import {collectAmouunt} from '../../../features/riderOrders/riderOrderSlice';

export default function CurrentOrders({navigation}) {
  const dispatch = useDispatch();
  const reduxData = useSelector(store => store);
  let orders = reduxData.riderOrder.orders;
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(null);

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
          <View
            style={{
              width: '100%',
              height: SCREEN_HEIGHT * 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyText label={'No Orders'} size={'subHeading'} />
          </View>
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
