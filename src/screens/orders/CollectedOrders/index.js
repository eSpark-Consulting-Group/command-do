import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {OrderCard} from '../../../components';
import {revertCollection} from '../../../features/riderOrders/riderOrderSlice';

export default function CollectedOrders({navigation}) {
  const reduxData = useSelector(store => store);
  let orders = reduxData.riderOrder.orders;
  const dispatch = useDispatch();

  const finishCollection = () => {
    Alert.alert('Confirmation', 'Are you sure you want to Finish Collection?', [
      {text: 'Yes', onPress: () => navigation.navigate('Purchasing_List')},
      {text: 'No', style: 'cancel'},
    ]);
  };

  const revertOrder = id => {
    dispatch(revertCollection(id));
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
        disabled={!orders.some(val => val.paid == true)}
        style={{
          width: '95%',
          alignItems: 'center',
          backgroundColor: orders.some(val => val.paid == true)
            ? '#11a79c'
            : '#ccc',
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 22, color: '#fff'}}>
          Finish Collection
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
