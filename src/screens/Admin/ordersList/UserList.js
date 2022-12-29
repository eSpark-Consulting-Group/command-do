import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CheckBox, Icon} from '@rneui/themed';

import {MyHeader, MyText, TouchRipple} from '../../../components';
import {colors} from '../../../theme';
import {GET_ALL_USERS} from '../../../graphQL/query/user.query';
import {useLazyQuery} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_HEIGHT} from '../../../constants';

export default function UserList() {
  const navigation = useNavigation();

  const [GetAllUsers, {loading}] = useLazyQuery(GET_ALL_USERS);
  const dispatch = useDispatch();
  const ordersByDate = useSelector(store => store.adminOrder.ordersByDate);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [orderFilterFields, setOrderFilterFields] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const orders = await GetAllUsers();
    const data = orders.data.getAllUsers.data;
    console.log('orders.data', data?.map(val => val?.record).flat());
    setOrderFilterFields(data?.map(val => val?.record).flat());
  };

  const handlePressUser = (item, index) => {
    setSelectedId(item.id);
  };

  const MyCheckBox = ({selected}) => {
    return (
      <CheckBox
        containerStyle={{
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
          alignSelf: 'center',
        }}
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={colors.primary}
            size={20}
            iconStyle={{marginRight: 5}}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color="grey"
            size={20}
            iconStyle={{marginRight: 5}}
          />
        }
        textStyle={{
          fontSize: 12,
          marginLeft: 0,
          marginRight: 5,
        }}
        checked={selected}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MyHeader
        title="Users"
        icon="checkmark"
        rightIconType="ionicon"
        leftIcon="arrow-back"
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Filters', {
            userList: orderFilterFields,
            userId: selectedId,
          });
        }}
      />
      <TouchRipple
        style={styles.listContainer}
        darkRipple
        onPress={() => setSelectedId(null)}>
        <MyText
          label={'No User'}
          textStyle={{textAlignVertical: 'center'}}
          size={16}
        />
        <MyCheckBox selected={!selectedId} />
      </TouchRipple>
      <FlatList
        data={orderFilterFields}
        renderItem={({item, index}) => (
          <View style={styles.listItem}>
            <TouchRipple
              style={styles.listContainer}
              darkRipple
              onPress={() => handlePressUser(item, index)}>
              <MyText
                label={item.firstName + ' ' + item.lastName}
                textStyle={{textAlignVertical: 'center'}}
                size={16}
              />
              <MyCheckBox selected={item.id == selectedId} />
            </TouchRipple>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchUsers} />
        }
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: SCREEN_HEIGHT * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText label={'No Users'} size={'subHeading'} />
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    elevation: 3,

    marginVertical: 8,
  },
});
