import React, {useState, useReducer, useCallback, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
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
import OverlayLoader from '../../../components/OverlayLoader';
import {GET_CATEGORIES_WITH_ID} from '../../../graphQL/query/categories.query';
import {GET_ALL_ITEMS} from '../../../graphQL/query/item.query';
import {set} from 'immer/dist/internal';

export default function Items() {
  const navigation = useNavigation();

  const [LoadCategories, {data: categoryData, loading: categoryLoader}] =
    useLazyQuery(GET_CATEGORIES_WITH_ID, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    });

  const [
    LoadItems,
    {data: itemData, error, refetch: refetchItems, loading: itemsLoading},
  ] = useLazyQuery(GET_ALL_ITEMS);

  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    fetchItems();
    LoadCategories();
  }, []);

  const fetchItems = (selected, cur) => {
    console.log('Selected', selected, cur, cursor);
    LoadItems({
      variables: {
        pagination: {
          cursor: cur == 1 ? null : cursor,
          limit: 20,
        },
        where: {
          categoryId: selected > 0 ? selected : undefined,
        },
      },
    });
  };

  // console.log('LaodITems Error', error);

  useEffect(() => {
    console.log(
      'cursor itemData?.getAllItems?.data',
      cursor,
      itemData?.getAllItems?.pagination?.nextCursor,
    );
    if (
      itemData?.getAllItems?.data &&
      cursor != itemData?.getAllItems?.pagination?.nextCursor &&
      selectedCategoryId < 1
    ) {
      console.log('first if');
      if (cursor != null) {
        setData(prv => [...prv, ...(itemData?.getAllItems?.data || [])]);
        setCursor(itemData?.getAllItems?.pagination?.nextCursor);
      } else {
        console.log('first else');
        setData(itemData?.getAllItems?.data);
        setCursor(itemData?.getAllItems?.pagination?.nextCursor);
      }
    }
    if (
      itemData?.getAllItems?.data &&
      selectedCategoryId > 0 &&
      cursor != null
    ) {
      console.log('second if');
      setData(prv => [...prv, ...(itemData?.getAllItems?.data || [])]);
      setCursor(itemData?.getAllItems?.pagination?.nextCursor);
    } else if (
      itemData?.getAllItems?.data &&
      selectedCategoryId > 0 &&
      cursor == null
    ) {
      console.log('second else');
      setData(itemData?.getAllItems?.data);
      setCursor(itemData?.getAllItems?.pagination?.nextCursor);
    }
  }, [itemData?.getAllItems?.data]);

  const getOnEnd = async () => {
    console.log('Getting on end');
    fetchItems(selectedCategoryId);
  };

  const handlePress = id => {
    setData([]);
    setCursor(null);
    setSelectedCategoryId(id);
    fetchItems(id, 1);
  };

  return (
    <View style={styles.container}>
      <OverlayLoader show={categoryLoader} />
      {data.length < 1 ||
        (selectedCategoryId > 0 ? (
          <OverlayLoader show={categoryLoader || itemsLoading} />
        ) : null)}

      <MyHeader
        title={'All Items'}
        icon="search"
        onPressRight={() =>
          navigation.navigate('SearchItem', {
            navigateTo: 'Add_Form',
          })
        }
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
          {categoryData?.getAllCategories?.data?.length !== 0 &&
            selectedCategoryId > 0 && (
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
                        itemData: categoryData?.getAllCategories?.data?.find(
                          value => value?.id == selectedCategoryId,
                        ),
                      })
                    }
                  />
                </MyCard>
              </>
            )}
        </View>
      </View>
      <View style={{width: SCREEN_WIDTH}}>
        {!categoryLoader && categoryData?.getAllCategories && (
          <FlatList
            data={[{name: 'All', id: 0}, ...categoryData.getAllCategories.data]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
            renderItem={({item, index}) => (
              <MyCard
                key={item.id}
                cardStyle={{
                  ...styles.category,
                  backgroundColor:
                    selectedCategoryId == item.id
                      ? colors.primary
                      : colors.background,
                }}>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => {
                    handlePress(item.id);
                  }}>
                  <MyText
                    label={item?.name}
                    size={'title'}
                    textStyle={{
                      color:
                        selectedCategoryId == item.id
                          ? colors.text_inverse
                          : colors.text_normal,
                    }}
                  />
                </TouchableOpacity>
              </MyCard>
            )}
          />
        )}
      </View>
      <View style={styles.subHeader}>
        <MyText
          label={'Items'}
          size={'subHeading'}
          textStyle={{alignSelf: 'center', paddingVertical: 10}}
        />
      </View>
      {!categoryLoader && data && (
        <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemContainer}
            // onEndReachedThreshold={1}
            onEndReached={() => {
              console.log('Load');
              if (cursor != null) {
                getOnEnd();
              }
            }}
            ListFooterComponent={
              itemsLoading &&
              data.length > 0 && <ActivityIndicator size={'large'} />
            }
            renderItem={({item, index}) => (
              <MyCard key={item.id} cardStyle={styles.item}>
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
                      itemData: item,
                    })
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: item?.image}}
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
    marginBottom: 10,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 2,
  },
});
