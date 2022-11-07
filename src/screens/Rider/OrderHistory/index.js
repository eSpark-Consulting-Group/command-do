import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {MyHeader, OrderHistoryCard} from '../../../components';

export default function OrderHistory() {
  return (
    <View style={{alignItems: 'center'}}>
      <MyHeader
        title="Order History"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
        }}
      />
      <OrderHistoryCard
        name="Wirad Ali"
        amount={250}
        paid={'PAID'}
        order={[{Item: {name: 'Chicken Biryani'}, quantity: 2}]}
      />
    </View>
  );
}
