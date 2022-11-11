import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/themed';

import {SearchBar, TouchRipple} from '../../../components';
import {ALL_ITEMS, SEARCH_ITEMS} from '../../../graphQL/query/item.query';
import {useLazyQuery} from '@apollo/client';

export default function SearchItem({route}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [lunchItems, setLunchItems] = useState([]);
  const [GetAllItems, {loading}] = useLazyQuery(ALL_ITEMS);
  const [SearchItems, {loading: searchLoading}] = useLazyQuery(SEARCH_ITEMS);

  const fetchOrders = async () => {
    const AllItems = await GetAllItems();
    console.log('All Items', AllItems.data.getAllItems.data);
    setLunchItems(AllItems.data.getAllItems.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateSearch = async text => {
    setSearch(text);
    const searchedItems = await SearchItems({
      variables: {
        text: text,
      },
    });
    console.log('Searched Items', searchedItems.data.searchItem.data);
    setLunchItems(searchedItems.data.searchItem.data);
    // const items = [...lunchItems];
    // const filItems = items.filter(item => item.name == text);
    // console.log('ITEMS', filItems);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        handleChangeText={text => updateSearch(text)}
        leftIcon="arrow-back"
        icon="close-circle"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setSearch('')}
        Loader={searchLoading}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={lunchItems}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchRipple
              rippleColor="#bdbdbd40"
              onPress={() =>
                navigation.navigate(route.params.navigateTo, {
                  foodType: item?.name,
                  item: item,
                })
              }>
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
