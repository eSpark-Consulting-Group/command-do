import {Input} from '@rneui/themed';
import React, {useEffect, useRef, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionc from 'react-native-vector-icons/Ionicons';
import {LineSeparater, OrderCard, OrderListHeader} from '../../components';

export default function CollectedOrders() {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <OrderListHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: '17%'}}>
        <OrderCard
          name={'Fahim Uddin'}
          order={[
            {item: 'Andy Wala Burger', qty: 2},
            {item: 'Banana Shake', qty: 1},
            {item: 'Biryani', qty: 1},
          ]}
          amount={300}
          paid={true}
        />
        <OrderCard
          name={'Fahim Uddin'}
          order={[
            {item: 'Andy Wala Burger', qty: 2},
            {item: 'Banana Shake', qty: 1},
            {item: 'Biryani', qty: 1},
          ]}
          amount={300}
          paid={true}
        />

        <OrderCard
          name={'Fahim Uddin'}
          order={[
            {item: 'Andy Wala Burger', qty: 2},
            {item: 'Banana Shake', qty: 1},
            {item: 'Biryani', qty: 1},
          ]}
          amount={300}
          paid={true}
        />
        <OrderCard
          name={'Fahim Uddin'}
          order={[
            {item: 'Andy Wala Burger', qty: 2},
            {item: 'Banana Shake', qty: 1},
            {item: 'Biryani', qty: 1},
          ]}
          amount={300}
          paid={true}
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: '2%',
          width: '95%',
          alignItems: 'center',
          backgroundColor: '#11a79c',
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: '600', fontSize: 22, color: '#fff'}}>
          Finish Collection
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
