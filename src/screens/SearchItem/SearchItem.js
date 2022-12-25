import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/themed';
import {useLazyQuery} from '@apollo/client';

import {MyText, SearchBar, TouchRipple} from '../../components';
import {GET_ALL_ITEMS, SEARCH_ITEMS} from '../../graphQL/query/item.query';
import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';

export default function SearchItem({route}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [lunchItems, setLunchItems] = useState([]);
  const [GetAllItems, {loading}] = useLazyQuery(GET_ALL_ITEMS);
  const [SearchItems, {loading: searchLoading}] = useLazyQuery(SEARCH_ITEMS);

  const fetchOrders = async () => {
    const AllItems = await GetAllItems();
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
    setLunchItems(searchedItems.data.searchItem.data);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        clearInput={() => setSearch('')}
        handleChangeText={text => setSearch(text)}
        leftIcon="arrow-back"
        icon="magnify"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => updateSearch(search)}
        Loader={searchLoading}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={lunchItems}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchRipple
              rippleColor="#bdbdbd40"
              onPress={() =>
                navigation.navigate(
                  route.params.navigateTo,
                  route.params.navigateTo == 'Add_Form'
                    ? {mode: 'edit', type: 'item', itemData: item}
                    : {foodType: item?.name, item: item},
                )
              }>
              <MyText textStyle={styles.item} label={item.name} />
            </TouchRipple>
          )}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={
            !loading && (
              <View
                style={{
                  height: SCREEN_HEIGHT * 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MyText label={"Can't Get Items"} />
              </View>
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {flex: 1},
  item: {
    padding: 10,
    // fontSize: moder,
    // height: 44,
  },
});
