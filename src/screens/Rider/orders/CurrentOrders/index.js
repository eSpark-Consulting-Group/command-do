import React, {useState} from 'react';
import {FlatList, View} from 'react-native';

import {CollectionModal, OrderCard} from '../../../../components';
import {orders} from '../../../../utils/data';

export default function CurrentOrders({navigation}) {
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
    let index = orders.findIndex(obj => obj.id == id);
    orders[index].paid = true;
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={orders}
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
