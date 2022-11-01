import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {OrderCard, OrderListHeader} from '../../../components';
import {orders} from '../../../utils/data';

export default function CollectedOrders({navigation}) {
  const finishCollection = () => {
    Alert.alert('Confirmation', 'Are you sure you want to Finish Collection?', [
      {text: 'Yes', onPress: () => navigation.navigate('Purchasing_List')},
      {text: 'No', style: 'cancel'},
    ]);
  };

  const revertOrder = id => {
    let index = orders.findIndex(obj => obj.id == id);
    orders[index].paid = false;
  };

  const revertConfirmation = id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to revert the Collection?',
      [
        {
          text: 'Yes',
          onPress: () => revertOrder(id),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={orders}
        renderItem={({item}) =>
          item.paid && (
            <OrderCard
              name={item.name}
              order={item.orders}
              amount={item.amount}
              paid={item.paid}
              onRevert={() => revertConfirmation(item.id)}
            />
          )
        }
      />
      <TouchableOpacity
        onPress={finishCollection}
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
