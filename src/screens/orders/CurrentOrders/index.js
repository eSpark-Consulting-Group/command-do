import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {CollectionModal, OrderCard} from '../../../components';
import {collectAmouunt} from '../../../features/riderOrders/riderOrderSlice';

export default function CurrentOrders({navigation}) {
  const reduxData = useSelector(store => store);
  const dispatch = useDispatch();
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
        data={reduxData.riderOrder.orders}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) =>
          !item.paid && (
            <OrderCard
              name={item.name}
              amount={item.amount}
              order={item.orders}
              paid={item.paid}
              onCollect={() => openOverlay(item.amount, item.id)}
            />
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
