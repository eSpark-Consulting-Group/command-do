import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Icon, SpeedDial} from '@rneui/themed';
import {useLazyQuery} from '@apollo/client';
import NetInfo from '@react-native-community/netinfo';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {
  GapView,
  MyHeader,
  MyText,
  TouchRipple,
  MyCard,
  BackButtonHandler,
} from '../../../components';
import {colors} from '../../../theme';
import OverlayLoader from '../../../components/OverlayLoader';
import {GET_CATEGORIES_WITH_ID} from '../../../graphQL/query/categories.query';
import {GET_ALL_ITEMS} from '../../../graphQL/query/item.query';
import {PicBack} from '../../../assets/images';
import {moderateVerticalScale} from 'react-native-size-matters';

export default function Items({route}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const itemsList = useRef(null);

  const [
    LoadCategories,
    {data: categoryData, loading: categoryLoader, refetch},
  ] = useLazyQuery(GET_CATEGORIES_WITH_ID, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [LoadItems, {data: itemData, loading: itemsLoading, fetchMore}] =
    useLazyQuery(GET_ALL_ITEMS, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    });

  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [isConnected, setIsConnected] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(null);

  const items = itemData?.getAllItems?.data;

  useEffect(() => {
    if (isConnected) {
      fetchItems();
      LoadCategories();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!itemsLoading) {
      setLoadMore(false);
    }
  }, [itemsLoading]);

  useEffect(() => {
    if (route?.params?.categoryList) {
      console.log('Categories Chala');
      LoadCategories();
    }
    if (route?.params?.edit) {
      console.log('Chala');
      setCursor(null);
      fetchItems(selectedCategoryId, 1);
    }
  }, [isFocused, route?.params?.edit]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
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

  const onLoadMore = () => {
    if (itemData?.getAllItems?.pagination?.nextCursor == null) {
      return;
    }
    itemsList.current.scrollToEnd();
    setLoadMore(true);
    fetchMore({
      variables: {
        where: {
          categoryId: selectedCategoryId > 0 ? selectedCategoryId : undefined,
        },
        pagination: {
          limit: 20,
          cursor: itemData?.getAllItems?.pagination?.nextCursor,
        },
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const newItems = fetchMoreResult.getAllItems.data;
        const updatedArr = [...previousResult?.getAllItems?.data, ...newItems];
        return {
          getAllItems: {
            ...fetchMoreResult?.getAllItems,
            pagination: fetchMoreResult?.getAllItems?.pagination,
            data: [
              ...new Map(updatedArr.map(item => [item['id'], item])).values(),
            ],
          },
        };
      },
    });
  };

  const handlePress = id => {
    setSelectedCategoryId(id);
    itemsList.current.scrollToOffset({animated: false, offset: 0});
    setCursor(null);
    fetchItems(id, 1);
  };

  return (
    <View style={styles.container}>
      {isFocused && <BackButtonHandler />}
      <StatusBar
        backgroundColor={
          visible || isConnected == false ? '#000000' : colors.primary
        }
      />
      <OverlayLoader show={categoryLoader} />

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
                      padding: moderateVerticalScale(10),
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
            data={
              categoryData.getAllCategories.data.length > 0
                ? [{name: 'All', id: 0}, ...categoryData.getAllCategories.data]
                : []
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  width: SCREEN_WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MyText label={'No Categories Found'} size={'title'} />
              </View>
            }
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
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={item.id == selectedCategoryId}
                  onPress={() => {
                    setCategoryIndex(index);
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
      {!categoryLoader && categoryData?.getAllCategories && (
        <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
          <FlatList
            data={items || []}
            ref={itemsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemContainer}
            onEndReached={() => {
              !itemsLoading && onLoadMore();
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setCursor(null);
                  fetchItems(selectedCategoryId, 1);
                }}
              />
            }
            ListEmptyComponent={
              <>
                {!categoryLoader && itemsLoading && (
                  <View
                    style={{
                      height: SCREEN_HEIGHT * 0.6,
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size={'large'} color={colors.primary} />
                  </View>
                )}
                {categoryLoader || itemsLoading ? null : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MyText label={'No Items Found'} size={'title'} />
                  </View>
                )}
              </>
            }
            ListFooterComponent={
              itemsLoading &&
              loadMore && (
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <ActivityIndicator size={'large'} />
                  <MyText
                    label={
                      categoryIndex > 0
                        ? `Loading More ${
                            categoryData?.getAllCategories?.data[
                              categoryIndex - 1
                            ]?.name
                          } Items...`
                        : 'Loading More Items...'
                    }
                  />
                </View>
              )
            }
            renderItem={({item, index}) => (
              <MyCard key={item.id} cardStyle={styles.item}>
                <TouchRipple
                  borderless
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
                      source={load ? {uri: item?.image} : PicBack}
                      onLoad={() => setLoad(true)}
                      style={{
                        height: moderateVerticalScale(50),
                        width: moderateVerticalScale(50),
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: colors.primary,
                      }}
                    />
                    <GapView mode="horizontal" />
                    <View style={{alignSelf: 'center'}}>
                      <MyText
                        label={item?.name}
                        size={'title'}
                        textStyle={{width: SCREEN_WIDTH / 2}}
                      />
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
        icon={{name: 'add', color: colors.text_inverse}}
        openIcon={{name: 'close', color: colors.text_inverse}}
        onOpen={() => setVisible(!visible)}
        onClose={() => setVisible(!visible)}>
        <SpeedDial.Action
          icon={{name: 'add', color: colors.text_inverse}}
          color={colors.primary}
          title="Add Category"
          onPress={() => {
            navigation.navigate('Add_Form', {mode: 'add', type: 'category'});
            setVisible(false);
          }}
        />
        <SpeedDial.Action
          icon={{name: 'add', color: colors.text_inverse}}
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
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    minWidth: moderateVerticalScale(50),
  },
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 2,
  },
});
