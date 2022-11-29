import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';

import {
  Cards,
  IndividualCard,
  CustomizeModal,
  MyText,
  OverlayLoader,
  BackButtonHandler,
} from '../../../components';
import {AllData, profileData} from '../../../utils/data';
import {initialDataUpdate} from '../../../features/profile/profileSlice';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_ITEMS,
} from '../../../graphQL/query/categories.query';
import {GET_CURRENT_REMAINING_AMOUNT} from '../../../graphQL/query/user.query';
import {GET_ALL_ITEMS} from '../../../graphQL/query/item.query';
import styles from './styles';
import {colors} from '../../../theme';
import {logout} from '../../../features/userInfo/userInfoSlice';
import {greetMessage} from '../../../utils/helperFunctions';
import {moderateVerticalScale} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');

function Home({route, navigation}) {
  const reduxData = useSelector(store => store);
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [press, setPress] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All',
    image: null,
    id: 0,
  });
  const userData = useSelector(store => store?.userInfo?.userData);

  const [
    LoadCategories,
    {data: categoriesData, loading: LoadCategoriesLoading},
  ] = useLazyQuery(GET_ALL_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const [
    getRemainingAmount,
    {data: remainingAmount, loading: LoadRemainingAmount},
  ] = useLazyQuery(GET_CURRENT_REMAINING_AMOUNT, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: userData?.id,
    },
  });

  const [
    LoadCategoriesWithItem,
    {data: categoriesWithItemData, loading: LoadCategoriesWithItemLoading},
  ] = useLazyQuery(GET_ALL_CATEGORIES_WITH_ITEMS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const [
    LoadItems,
    {
      data: itemData,
      refetch: refetchItems,
      loading: LoadItemsLoading,
      fetchMore,
    },
  ] = useLazyQuery(GET_ALL_ITEMS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const categories = categoriesData?.getAllCategories?.data;
  const items =
    selectedCategory?.id == 0
      ? categoriesWithItemData?.getAllCategories?.data
      : itemData?.getAllItems?.data;

  useEffect(() => {
    LoadCategories();
    getRemainingAmount();
    LoadCategoriesWithItem();
    dispatch(initialDataUpdate(profileData));
  }, []);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // const backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to exit App?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // };

  const isSelect = item => {
    setSelectedCategory(item);
    if (item?.id == 0) {
      LoadItems({
        variables: {
          where: {
            categoryId: undefined,
          },
        },
      });
    } else {
      LoadItems({
        variables: {
          pagination: {
            cursor: null,
            limit: 20,
          },
          where: {
            categoryId: item?.id,
          },
          pagination: {
            limit: 20,
            cursor: null,
          },
        },
      });
    }
  };

  console.log(
    ' Items itemData?.getAllItems ',
    itemData?.getAllItems?.pagination,
  );

  const onLoadMore = () => {
    if (itemData?.getAllItems?.pagination?.nextCursor == null) {
      return;
    }
    fetchMore({
      variables: {
        where: {
          categoryId: selectedCategory?.id,
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

  const _onSelect = () => {
    if (reduxData?.cart?.amount == 0) {
      showMessage({
        message: `Warning`,
        type: 'warning',
        icon: 'auto',
        description: `Your cart is empty\nPlease add some items in your cart.`,
      });
    } else {
      navigation.navigate('Cart');
    }
  };

  const isModalVisible = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setIsModal(!isModal);
  };

  const onReachEnd = () => {
    setReachedEnd(true);
  };

  const onScrollToTopStart = () => {
    setReachedEnd(false);
  };

  const goToNavigation = navigate => {
    navigation.navigate(navigate);
    setIsModal(!isModal);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <BackButtonHandler />
      <StatusBar backgroundColor={colors.primary} />
      <OverlayLoader
        show={
          LoadItemsLoading ||
          LoadCategoriesLoading ||
          LoadCategoriesWithItemLoading
        }
      />

      <CustomizeModal
        isVisible={isModal}
        setBackDrop={isModalVisible}
        navigation={navigation}
        renderData={
          <View style={styles.modalInner}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => goToNavigation('Profile')}>
              <Icon
                name="person"
                size={height * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Profile'}
                size={'title'}
                textStyle={{color: colors.text_normal + '80'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => goToNavigation('ChangePassword')}>
              <Icon
                name="settings-sharp"
                size={height * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Change Password'}
                size={'title'}
                textStyle={{color: colors.text_normal + '80'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => goToNavigation('OrderHistory')}>
              <Icon
                name="ios-newspaper"
                size={height * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Orders'}
                size={'title'}
                textStyle={{color: colors.text_normal + '80'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, {borderBottomWidth: height * 0}]}
              onPress={() => logoutHandler()}>
              <Icon
                name="ios-exit"
                size={height * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Log out'}
                size={'title'}
                textStyle={{color: colors.text_normal + '80'}}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setIsModal(!isModal)}>
            <Icon
              name="person-circle-outline"
              size={moderateVerticalScale(28)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerCenterComponentStyle}>
            <MyText
              label={"What's your order?🍔"}
              textStyle={{color: colors.text_normal, fontSize: height * 0.024}}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchItem', {navigateTo: 'Item'})
            }>
            <Icon
              name="search"
              size={moderateVerticalScale(28)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: height * 0.0001,
          }}>
          <MyText
            label={`Hi, ${reduxData?.userInfo?.userData?.firstName}`}
            size={'subHeading'}
          />
          <MyText label={greetMessage()} />
        </View>

        {remainingAmount?.getCurrentRemainingAmount?.data?.remainingAmount >
          0 && (
          <View
            style={{
              justifyContent: 'center',
              flex: 0.5,
              borderRadius: 15,
              backgroundColor: '#dff2e4',
              width: width * 0.9,
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              marginVertical: height * 0.007,
            }}>
            <MyText
              label={'You have a remaining amount of '}
              textStyle={{justifyContent: 'center', textAlign: 'center'}}
            />
            <MyText
              label={`Rs:${remainingAmount?.getCurrentRemainingAmount?.data?.remainingAmount}`}
              textStyle={{
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                bottom: 2,
              }}
            />
          </View>
        )}
        <View style={styles.categoryContainer}>
          {categories && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[{name: 'All', image: null, id: 0}, ...categories]?.map(
                (item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectedCategory?.id == item?.id
                          ? colors.primary
                          : colors.background,
                      elevation:
                        selectedCategory?.id == item?.id ? height * 0.003 : 0,
                      paddingHorizontal: item.logo
                        ? height * 0.01
                        : height * 0.02,
                      borderWidth:
                        selectedCategory?.id == item?.id ? 0 : height * 0.001,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: height * 0.005,
                      borderColor: '#00000030',
                      marginHorizontal: height * 0.005,
                      borderRadius: height * 0.01,
                    }}
                    onPress={() => isSelect(item)}>
                    <View>
                      {item.image && (
                        <Image
                          source={{uri: item?.image}}
                          style={styles.categoryImage}
                        />
                      )}
                    </View>

                    <View>
                      <MyText
                        label={item?.name}
                        size={'title'}
                        textStyle={{
                          color:
                            selectedCategory?.id == item?.id
                              ? colors.text_inverse
                              : colors.text_normal,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          )}
        </View>
        {
          <View
            style={{
              flex: 4,
            }}>
            {selectedCategory?.id == 0 ? (
              <Cards data={items || []} navigation={navigation} />
            ) : (
              <IndividualCard
                fetchMoreOnEnd={onLoadMore}
                cursor={itemData?.getAllItems?.pagination?.nextCursor}
                data={items || []}
                loading={LoadItemsLoading}
                navigation={navigation}
                onReachEnd={onReachEnd}
                onScrollToTopStart={onScrollToTopStart}
              />
            )}
          </View>
        }

        {!reachedEnd ? (
          <TouchableOpacity
            style={styles.cartContainerStyle}
            disabled={reduxData?.cart?.amount == 0 && press}
            onPress={_onSelect}>
            <Icon
              name="cart-outline"
              size={moderateVerticalScale(27)}
              color={colors.text_inverse}
            />
            {reduxData?.cart?.amount != 0 && (
              <View style={styles.cartAmountStyle}>
                <MyText
                  label={
                    reduxData?.cart?.amount > 99
                      ? '99+'
                      : reduxData?.cart?.amount
                  }
                  subTitle
                  textStyle={{color: colors.text_normal}}
                />
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            ddisabled={reduxData?.cart?.amount == 0 && press}
            style={{
              ...styles.cartButtonStyle,
            }}
            onPress={_onSelect}>
            <Icon
              name="cart-outline"
              size={height * 0.04}
              color={colors.text_inverse}
              style={{
                position: 'absolute',
                left: height * 0.02,
              }}
            />
            <MyText
              label={'Checkout Cart'}
              title
              textStyle={{color: colors.text_inverse}}
            />
            {reduxData?.cart?.amount != 0 && (
              <View style={styles.cartCountStyle}>
                <MyText
                  label={
                    reduxData?.cart?.amount > 99
                      ? '99+'
                      : reduxData?.cart?.amount
                  }
                  subTitle
                  textStyle={{color: colors.text_inverse}}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Home;
