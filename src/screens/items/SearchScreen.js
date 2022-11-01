import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchBar, TouchRipple} from '../../components';
import {Divider} from '@rneui/themed';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const lunchItems = [
    {id: 0, name: 'Paratha'},
    {id: 1, name: 'Naan'},
    {id: 2, name: 'Bhatti Chapati'},
    {id: 3, name: 'Bhatti Naan'},
    {id: 4, name: 'Fanta 200ml'},
    {id: 5, name: 'Coca Cola 200ml'},
    {id: 6, name: 'Lays Cheese (large)'},
    {id: 7, name: 'Anda Gotala'},
    {id: 8, name: 'Salad'},
    {id: 9, name: 'Raita'},
    {id: 10, name: 'Chicken Biryani'},
    {id: 11, name: 'Sada Biryani'},
    {id: 12, name: 'Sada Pulao'},
    {id: 13, name: 'Chicken Pulao'},
    {id: 14, name: 'Daal Maash'},
    {id: 15, name: 'Daal Channa'},
    {id: 16, name: 'Club Sandwich'},
    {id: 17, name: 'Zinger Burger'},
    {id: 18, name: 'Andy Wala Burger'},
  ];

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        handleChangeText={text => setSearch(text)}
        leftIcon="arrow-back"
        icon="close-circle"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setSearch('')}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={lunchItems}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchRipple
              rippleColor="#bdbdbd40"
              onPress={() => {
                navigation.navigate('Add_Form', {mode: 'edit', type: 'item'});
              }}>
              <Text style={styles.item}>{item.name}</Text>
            </TouchRipple>
          )}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {flex: 1},
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
