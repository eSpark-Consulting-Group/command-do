import React, {useState, useReducer, useCallback} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Icon, SpeedDial} from '@rneui/themed';
import {useLazyQuery} from '@apollo/client';

import {SCREEN_WIDTH} from '../../../constants';
import {
  GapView,
  MyHeader,
  MyText,
  TouchRipple,
  MyCard,
} from '../../../components';
import {colors} from '../../../theme';
import {handleCountReducer} from '../../../reducers/userReducer';
import {initialState} from '../../../app/store';
import OverlayLoader from '../../../components/OverlayLoader';
import {GET_CATEGORIES_WITH_ID} from '../../../graphQL/query/categories.query';
import {GET_ALL_ITEMS} from '../../../graphQL/query/item.query';

const sampleItems = [
  {name: 'Chicken Biryani', category: 'Rice', amount: 150},
  {name: 'Sada Biryani', category: 'Rice', amount: 150},
  {name: 'Chicken Pulao', category: 'Rice', amount: 150},
  {name: 'Sada Pulao', category: 'Rice', amount: 150},
  {name: 'Fanta 200ml', category: 'Beverages', amount: 150},
  {name: 'Lays (50 wala)', category: 'Snacks', amount: 150},
  {name: 'Anda Gotala', category: 'Salan', amount: 150},
  {name: 'Chicken Karahi', category: 'Salan', amount: 150},
];

export default function Items() {
  const categoryPrefix = {name: 'All', color: true, id: undefined};

  const navigation = useNavigation();

  const [LoadCategories, {loading: categoryLoader, refetch, error}] =
    useLazyQuery(GET_CATEGORIES_WITH_ID, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    });
  const [
    LoadItems,
    {data: itemData, refetch: refetchItems, loading: itemsLoading},
  ] = useLazyQuery(GET_ALL_ITEMS);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const [visible, setVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  // const [count, dispatchCount] = useReducer(
  //   handleCountReducer,
  //   initialState.count,
  // );

  useFocusEffect(
    React.useCallback(() => {
      LoadItems();
      getAllCategories();
    }, [refetch, refetchItems]),
  );

  const getItems = async selected => {
    console.log('PPPPBBBB', selected);
    if (selected?.id == undefined) {
      await LoadItems({
        variables: {
          where: {
            categoryId: undefined,
          },
        },
      });
    } else {
      await LoadItems({
        variables: {
          where: {
            categoryId: selected?.id,
          },
        },
      });
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await LoadCategories();
      console.log('===>>', JSON.stringify(res?.data?.getAllCategories));
      if (res?.data?.getAllCategories?.status) {
        const {data} = res?.data?.getAllCategories;
        let newData = data.map(item => ({...item, color: false}));
        setCategoryData([categoryPrefix, ...newData]);
        console.log('==xxx>', categoryData);
      }
    } catch (e) {
      console.log('error while fetching', e);
    }
  };

  const handlePress = index => {
    let selected = {};
    let temp = [...categoryData];
    temp.forEach((item, index2) =>
      index == index2 ? (item.color = true) : (item.color = false),
    );
    setCategoryData(temp);
    temp.forEach(item => (item.color ? (selected = item) : null));
    console.log(categoryData);
    forceUpdate();
    getItems(selected);
  };

  // const handleIncreament = () => {
  //   dispatchCount({type: 'increment'});
  // };

  console.log('XXZWASD', itemData?.getAllItems?.data);

  return (
    <View style={styles.container}>
      <OverlayLoader show={categoryLoader || itemsLoading} />
      <MyHeader
        title={'All Items'}
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
          {categoryData.length !== 0 && !categoryData[0].color && (
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
      {itemData?.getAllItems?.data && (
        <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
          <FlatList
            data={itemData?.getAllItems?.data}
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
                        label={item?.Category?.name}
                        size={'title'}
                        textStyle={{opacity: 0.6}}
                      />
                    </View>
                  </View>
                  <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                    <MyText
                      label={`Rs. ${item?.price}`}
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
      )}
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
