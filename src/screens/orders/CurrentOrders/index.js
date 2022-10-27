import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {CollectionModal, OrderCard, OrderListHeader} from '../../../components';
import {orders} from '../../../utils/data';

export default function CurrentOrders({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');

  const openOverlay = val => {
    setShowModal(true);
    setAmount(val);
  };
  const closeOverlay = () => {
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {name: 'rohail'})}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
      <OrderListHeader />
      <FlatList
        data={orders}
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => (
          <OrderCard
            name={item.name}
            amount={item.amount}
            order={item.orders}
            paid={item.paid}
            onCollect={() => openOverlay(item.amount)}
          />
        )}
      />
      {showModal && (
        <CollectionModal
          isVisible={showModal}
          totAmount={amount}
          closeModal={closeOverlay}
        />
      )}
    </View>
  );
}
