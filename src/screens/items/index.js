import React from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants';
import {GapView, MyText} from '../../components';
import {MyCard} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../theme';

export default function Items() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{...styles.header, backgroundColor: colors.primary}}>
        <MyText
          label={'All Items'}
          size={'subHeading'}
          textStyle={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
            textAlignVertical: 'center',
            color: colors.text_inverse,
          }}
        />
        <Icon
          name="search"
          size={34}
          color={colors.text_inverse}
          containerStyle={{alignSelf: 'center'}}
        />
      </View>
      <View style={styles.subHeader}>
        <MyText label={'Categories'} size={'subHeading'} />
        <Icon
          name="add"
          onPress={() =>
            navigation.navigate('Add_Form', {mode: 'add', class: 'category'})
          }
        />
      </View>
      <View style={{width: SCREEN_WIDTH}}>
        <FlatList
          data={[
            {name: 'All'},
            {name: 'Salan'},
            {name: 'Rice'},
            {name: 'Snacks'},
            {name: 'Beverages'},
            {name: 'Desserts'},
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item, index}) => (
            <MyCard cardStyle={styles.category}>
              <TouchableOpacity style={{padding: 10}} onPress={() => {}}>
                <MyText label={item?.name} size={'title'} />
              </TouchableOpacity>
            </MyCard>
          )}
        />
      </View>
      <View style={styles.subHeader}>
        <MyText label={'Items'} size={'subHeading'} />
        <Icon
          name="add"
          onPress={() =>
            navigation.navigate('Add_Form', {mode: 'add', class: 'item'})
          }
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
                <MyCard cardStyle={{padding: 5, borderRadius: 100}}>
                  <Icon name="edit" />
                </MyCard>
              </View>
            </MyCard>
          )}
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
  header: {
    width: SCREEN_WIDTH,
    backgroundColor: '#fafafa',
    padding: 10,
    paddingHorizontal: 15,
    elevation: 5,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
