import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GapView, MyHeader, MyText} from '../../components';
import {colors} from '../../theme';

export default function FilterScreen() {
  const navigation = useNavigation();

  const [orderFilterFields, setOrderFilterFields] = useState([
    {label: 'Select Type', selection: 'Please Select', onPress: () => {}},
    {label: 'Select Range', selection: 'Range', onPress: () => {}},
  ]);

  const handleSecondField = () => {};

  return (
    <View style={styles.container}>
      <MyHeader
        title="Filters"
        icon="checkmark"
        rightIconType="ionicon"
        leftIcon="filter-remove-outline"
        leftIconType="material-community"
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={orderFilterFields}
        style={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <MyText
              label={item.label}
              textStyle={{textAlignVertical: 'center'}}
              size={16}
            />
            <MyText
              label={item.selection}
              textStyle={{textAlignVertical: 'center'}}
              size="title"
            />
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
    // marginTop: 5,
    // backgroundColor: 'teal',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
    paddingVertical: 20,
    marginVertical: 8,
  },
});
