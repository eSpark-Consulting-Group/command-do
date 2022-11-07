import React, {useState, useReducer} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, SpeedDial} from '@rneui/themed';

import {SCREEN_WIDTH} from '../../../constants';
import {
  GapView,
  MyHeader,
  MyText,
  TouchRipple,
  MyCard,
} from '../../../components';
import {colors} from '../../../theme';

let categoryData = [
  {name: 'All', color: true},
  {name: 'Salan', color: false},
  {name: 'Rice', color: false},
  {name: 'Snacks', color: false},
  {name: 'Beverages', color: false},
  {name: 'Desserts', color: false},
];

export default function Items() {
  const navigation = useNavigation();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [visible, setVisible] = useState(false);

  const handlePress = index => {
    let temp = [...categoryData];
    temp.forEach((item, index2) =>
      index == index2 ? (item.color = true) : (item.color = false),
    );
    categoryData = temp;
    console.log(categoryData);
    forceUpdate();
  };

  return (
    <View style={styles.container}>
      <MyHeader
        title="All Items"
        icon="search"
        onPressRight={() => navigation.navigate('SearchItem')}
      />
      <View style={{...styles.subHeader}}>
        <MyText
          label={'Categories'}
          size={'subHeading'}
          textStyle={{alignSelf: 'center', paddingVertical: 10}}
        />
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            flexDirection: 'row-reverse',
          }}>
          {!categoryData[0].color && (
            <>
              <MyCard cardStyle={{borderRadius: 100}}>
                <Icon
                  name="edit"
                  style={{
                    textAlignVertical: 'center',
                    padding: 10,
                  }}
                  containerStyle={{borderRadius: 100}}
                  pressableProps={{
                    android_ripple: {borderless: true, color: '#8f8f8f33'},
                  }}
                  onPress={() =>
                    navigation.navigate('Add_Form', {
                      mode: 'edit',
                      type: 'category',
                    })
                  }
                />
              </MyCard>
            </>
          )}
        </View>
      </View>
      <View style={{width: SCREEN_WIDTH}}>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item, index}) => (
            <MyCard
              cardStyle={{
                ...styles.category,
                backgroundColor: item.color
                  ? colors.primary
                  : colors.background,
              }}>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => {
                  console.log('touched', item.color);
                  handlePress(index);
                }}>
                <MyText
                  label={item?.name}
                  size={'title'}
                  textStyle={{
                    color: item.color
                      ? colors.text_inverse
                      : colors.text_normal,
                  }}
                />
              </TouchableOpacity>
            </MyCard>
          )}
        />
      </View>
      <View style={styles.subHeader}>
        <MyText
          label={'Items'}
          size={'subHeading'}
          textStyle={{alignSelf: 'center', paddingVertical: 10}}
        />
      </View>
      <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
        <FlatList
          data={[
            {name: 'Chicken Biryani', category: 'Rice', amount: 150},
            {name: 'Sada Biryani', category: 'Rice', amount: 150},
            {name: 'Chicken Pulao', category: 'Rice', amount: 150},
            {name: 'Sada Pulao', category: 'Rice', amount: 150},
            {name: 'Fanta 200ml', category: 'Beverages', amount: 150},
            {name: 'Lays (50 wala)', category: 'Snacks', amount: 150},
            {name: 'Anda Gotala', category: 'Salan', amount: 150},
            {name: 'Chicken Karahi', category: 'Salan', amount: 150},
          ]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemContainer}
          renderItem={({item, index}) => (
            <MyCard cardStyle={styles.item}>
              <TouchRipple
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
                darkRipple
                onPress={() =>
                  navigation.navigate('Add_Form', {
                    mode: 'edit',
                    type: 'item',
                  })
                }>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      backgroundColor: 'teal',
                    }}
                  />
                  <GapView mode="horizontal" />
                  <View style={{alignSelf: 'center'}}>
                    <MyText label={item?.name} size={'title'} />
                    <MyText
                      label={item?.category}
                      size={'title'}
                      textStyle={{opacity: 0.6}}
                    />
                  </View>
                </View>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                  <MyText
                    label={`Rs. ${item?.amount}`}
                    size={'title'}
                    textStyle={{alignSelf: 'center'}}
                  />
                  <GapView mode="horizontal" length={15} />
                </View>
              </TouchRipple>
            </MyCard>
          )}
        />
      </View>
      <SpeedDial
        isOpen={visible}
        color={colors.primary}
        icon={{name: 'add', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setVisible(!visible)}
        onClose={() => setVisible(!visible)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          color={colors.primary}
          title="Add Category"
          onPress={() => {
            navigation.navigate('Add_Form', {mode: 'add', type: 'category'});
            setVisible(false);
          }}
        />
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          color={colors.primary}
          title="Add Item"
          onPress={() => {
            navigation.navigate('Add_Form', {mode: 'add', type: 'item'});
            setVisible(false);
          }}
        />
      </SpeedDial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH,
  },
  categoryContainer: {
    paddingVertical: 5,
  },
  category: {
    marginHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 2,
  },
});
