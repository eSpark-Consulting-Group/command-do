import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { useLazyQuery } from '@apollo/client';

import { MyText, SearchBar, TouchRipple } from '../../components';
import { GET_ALL_ITEMS, SEARCH_ITEMS } from '../../graphQL/query/item.query';
import { SCREEN_HEIGHT } from '../../constants';
import { GET_ALL_USERS } from '../../graphQL/query/user.query';
import { colors } from '../../theme';
import { ActivityIndicator } from 'react-native';

export default function SearchItem({ route }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [lunchItems, setLunchItems] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [GetAllItems, { loading }] = useLazyQuery(GET_ALL_ITEMS);
  const [SearchItems, { loading: searchLoading }] = useLazyQuery(SEARCH_ITEMS);
  const [GetAllUsers, { loading: loadUsers }] = useLazyQuery(GET_ALL_USERS);

  const navigateTo = route.params.navigateTo;

  const fetchItems = async () => {
    const AllItems = await GetAllItems();
    setLunchItems(AllItems.data.getAllItems.data);
  };

  const fetchUsers = async () => {
    const AllUsers = await GetAllUsers();
    const userData = AllUsers.data.getAllUsers.data;
    let arr = [];
    userData.map(item =>
      item.record.map(item1 =>
        arr.push({
          id: item1.id,
          name:
            item1.firstName.toLowerCase() + ' ' + item1.lastName.toLowerCase(),
        }),
      ),
    );
    setAllUsers(arr);
    setSearchedUsers(arr);
  };

  useEffect(() => {
    navigateTo == 'PurchasedOrders' ? fetchUsers() : fetchItems();
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

  const updateUserSearch = text => {
    setSearch(text);
    const chars = text.toLowerCase();
    const arrr = allUsers.filter(item => item.name.includes(chars));
    setSearchedUsers(arrr);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        clearInput={() => setSearch('')}
        handleChangeText={text => updateUserSearch(text)}
        leftIcon="arrow-back"
        icon="magnify"
        placeholder={
          navigateTo == 'PurchasedOrders'
            ? `Search "Ali..`
            : `Search "Biryani..`
        }
        onPressLeft={() => navigation.goBack()}
        onPressRight={() =>
          navigateTo == 'PurchasedOrders'
            ? updateUserSearch(search)
            : updateSearch(search)
        }
        onSubmit={() =>
          navigateTo == 'PurchasedOrders'
            ? updateUserSearch(search)
            : updateSearch(search)
        }
        Loader={searchLoading}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={navigateTo == 'PurchasedOrders' ? searchedUsers : lunchItems}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchRipple
              rippleColor="#bdbdbd40"
              onPress={() =>
                navigation.navigate(
                  navigateTo,
                  navigateTo == 'Add_Form'
                    ? { mode: 'edit', type: 'item', itemData: item }
                    : navigateTo == 'PurchasedOrders'
                    ? { userId: item.id }
                    : { foodType: item?.name, item: item },
                )
              }>
              <MyText textStyle={styles.item} label={item.name} />
            </TouchRipple>
          )}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={
            !loadUsers && !loading ? (
              <View
                style={{
                  height: SCREEN_HEIGHT * 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MyText label={"Can't Get Items"} />
              </View>
            ) : (
              <View
                style={{
                  height: SCREEN_HEIGHT * 0.8,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
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
  listContainer: { flex: 1 },
  item: {
    padding: 10,
    textTransform: 'capitalize',
  },
  userItem: {
    color: colors.text_normal,
    padding: 10,
    textTransform: 'capitalize',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text_inverse,
    backgroundColor: colors.primary,
    elevation: 1,
  },
});
