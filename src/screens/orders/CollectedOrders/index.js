import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {OrderCard, OrderListHeader} from '../../../components';

export default function CollectedOrders({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <OrderListHeader />
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
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
        onPress={() => navigation.navigate('Purchasing_List')}
        style={{
          width: '95%',
          alignItems: 'center',
          backgroundColor: '#11a79c',
          marginVertical: 10,
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
