import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GapView, MyHeader, MyText, TouchRipple} from '../../components';
import {colors} from '../../theme';
import {CheckBox, Icon} from '@rneui/themed';

export default function UserList() {
  const navigation = useNavigation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [orderFilterFields, setOrderFilterFields] = useState([
    {
      label: 'No User',
      selected: true,
    },
    {
      label: 'Wirad Ali',
      selected: false,
    },
    {
      label: 'Faraz Uddin',
      selected: false,
    },
    {
      label: 'Mudassir Ali',
      selected: false,
    },
  ]);

  const handlePressUser = (item, index) => {
    let tempArr = [...orderFilterFields];
    tempArr[index].selected = true;
    tempArr.map((item, ind) =>
      index !== ind ? (item.selected = false) : true,
    );
    setSelectedUser(item);
    setOrderFilterFields(tempArr);
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
            user: selectedUser,
          });
        }}
      />
      <FlatList
        data={orderFilterFields}
        renderItem={({item, index}) => (
          <View style={styles.listItem}>
            <TouchRipple
              style={styles.listContainer}
              darkRipple
              onPress={() => handlePressUser(item, index)}>
              <MyText
                label={item.label}
                textStyle={{textAlignVertical: 'center'}}
                size={16}
              />
              <MyCheckBox selected={item.selected} />
            </TouchRipple>
          </View>
        )}
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
