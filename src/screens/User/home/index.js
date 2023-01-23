import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { useIsFocused } from '@react-navigation/native';
import { moderateVerticalScale } from 'react-native-size-matters';

import {
  Cards,
  IndividualCard,
  MyText,
  OverlayLoader,
  BackButtonHandler,
  BlurBackground,
  GapView,
} from '../../../components';
import { profileData } from '../../../utils/data';
import { initialDataUpdate } from '../../../features/profile/profileSlice';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_ITEMS,
} from '../../../graphQL/query/categories.query';
import {
  GET_CURRENT_REMAINING_AMOUNT,
  GET_USER_DETAIL,
} from '../../../graphQL/query/user.query';
import { GET_ALL_ITEMS } from '../../../graphQL/query/item.query';
import styles from './styles';
import { colors } from '../../../theme';
import {
  getUserDetails,
  logout,
} from '../../../features/userInfo/userInfoSlice';
import { greetMessage } from '../../../utils/helperFunctions';
import { clearCart } from '../../../features/cart/cartSlice';
import { useLayoutAnimation } from '../../../utils/hooks/useUpdateEffect/useLayoutAnimation';
import { SCREEN_WIDTH } from '../../../constants';

function Home({ navigation }) {
  const reduxData = useSelector(store => store);
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isConnected, setIsConnected] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All',
    image: null,
    id: 0,
  });
  const userData = useSelector(store => store?.userInfo?.userData);

  const [
    LoadCategories,
    { data: categoriesData, loading: LoadCategoriesLoading },
  ] = useLazyQuery(GET_ALL_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const [
    getRemainingAmount,
    { data: remainingAmount, loading: LoadRemainingAmount },
  ] = useLazyQuery(GET_CURRENT_REMAINING_AMOUNT, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: userData?.id,
    },
  });

  const [
    LoadCategoriesWithItem,
    { data: categoriesWithItemData, loading: LoadCategoriesWithItemLoading },
  ] = useLazyQuery(GET_ALL_CATEGORIES_WITH_ITEMS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const [LoadItems, { data: itemData, loading: LoadItemsLoading, fetchMore }] =
    useLazyQuery(GET_ALL_ITEMS, {
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
  }, []);

  console.log('reduxData?.cart?.amount', reduxData?.cart?.amount);

  useEffect(() => {
    if (!LoadItemsLoading) {
      setLoadMore(false);
    }
  }, [LoadItemsLoading]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const isFocused = useIsFocused();

  const isSelect = item => {
    onScrollToTopStart();
    // useLayoutAnimation();
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

  const onLoadMore = () => {
    if (itemData?.getAllItems?.pagination?.nextCursor == null) {
      return;
    }
    setLoadMore(true);
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
      updateQuery: (previousResult, { fetchMoreResult }) => {
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
        message: `Your cart is empty`,
        description: `Please add some items in your cart.`,
        type: 'warning',
        icon: 'auto',
      });
    } else {
      navigation.navigate('Cart');
    }
  };

  const onReachEnd = () => {
    setReachedEnd(true);
  };

  const onScrollToTopStart = () => {
    setReachedEnd(false);
  };

  const goToNavigation = navigate => {
    setIsModal(false);
    navigation.navigate(navigate);
  };

  const logoutHandler = () => {
    setIsModal(false);
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}>
        {isFocused && <BackButtonHandler />}
        <StatusBar
          backgroundColor={
            isModal || isConnected == false
              ? colors.text_normal
              : colors.primary
          }
        />
        <OverlayLoader
          show={
            !loadMore &&
            (LoadItemsLoading ||
              LoadCategoriesLoading ||
              LoadCategoriesWithItemLoading)
          }
        />
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Menu
              opened={isModal}
              onBackdropPress={() => setIsModal(false)}
              renderer={renderers.Popover}
              rendererProps={{
                placement: 'bottom',
              }}>
              <MenuTrigger
                children={
                  <TouchableOpacity
                    style={{ zIndex: 2 }}
                    onPress={() => setIsModal(!isModal)}>
                    <Icon
                      name="person-circle-outline"
                      size={moderateVerticalScale(28)}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                }
              />
              <MenuOptions
                customStyles={{ optionsContainer: styles.modalInner }}>
                <MenuOption
                  style={styles.buttonContainer}
                  onSelect={() => goToNavigation('Profile')}
                  children={
                    <>
                      <MCI
                        name="account"
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Profile'}
                        size={'title'}
                        textStyle={{ color: colors.text_normal + '80' }}
                      />
                    </>
                  }
                />
                <MenuOption
                  style={styles.buttonContainer}
                  onSelect={() => goToNavigation('ChangePassword')}
                  children={
                    <>
                      <MCI
                        name="shield-lock"
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Change Password'}
                        size={'title'}
                        textStyle={{ color: colors.text_normal + '80' }}
                      />
                    </>
                  }
                />
                <MenuOption
                  style={styles.buttonContainer}
                  onSelect={() => goToNavigation('OrderHistory')}
                  children={
                    <>
                      <MCI
                        name="newspaper-variant-outline"
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Orders'}
                        size={'title'}
                        textStyle={{ color: colors.text_normal + '80' }}
                      />
                    </>
                  }
                />
                <MenuOption
                  style={styles.buttonContainer}
                  onSelect={logoutHandler}
                  children={
                    <>
                      <MCI
                        name="exit-to-app"
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Log out'}
                        size={'title'}
                        textStyle={{ color: colors.text_normal + '80' }}
                      />
                    </>
                  }
                />
              </MenuOptions>
            </Menu>
            <View style={styles.headerCenterComponentStyle}>
              <MyText
                label={"What's your order?🍔"}
                textStyle={{
                  fontSize: moderateVerticalScale(20),
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SearchItem', { navigateTo: 'Item' })
              }>
              <Icon
                name="search"
                size={moderateVerticalScale(28)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.greetingMsgContainer}>
            <MyText
              label={`Hi, ${reduxData?.userInfo?.userData?.firstName}`}
              textStyle={{
                fontSize: moderateVerticalScale(22),
              }}
            />
            <MyText label={greetMessage()} />
          </View>
          {remainingAmount?.getCurrentRemainingAmount?.data?.remainingAmount >
            0 && (
            <View style={styles.remainingAmountAlertContainer}>
              <MyText
                label={'You have a remaining amount of '}
                textStyle={styles.remainingAmountText}
              />
              <MyText
                label={`Rs: ${remainingAmount?.getCurrentRemainingAmount?.data?.remainingAmount}`}
                textStyle={{
                  fontFamily: 'Poppins-Bold',
                }}
              />
            </View>
          )}
          <View style={styles.categoryContainer}>
            {categories && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ name: 'All', image: null, id: 0 }, ...categories]}
                ListHeaderComponent={
                  <GapView
                    length={moderateVerticalScale(12)}
                    mode={'horizontal'}
                  />
                }
                ListFooterComponent={
                  <GapView
                    length={moderateVerticalScale(12)}
                    mode={'horizontal'}
                  />
                }
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      ...styles.categoryButton,
                      backgroundColor:
                        selectedCategory?.id == item?.id
                          ? colors.primary
                          : colors.background,
                      paddingHorizontal: item.logo
                        ? moderateVerticalScale(7)
                        : moderateVerticalScale(14),
                    }}
                    onPress={() => isSelect(item)}>
                    <View>
                      {item.image && (
                        <Image
                          source={{ uri: item?.image }}
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
                )}
              />
            )}
          </View>
          {categories && (
            <View
              style={{
                flex: 1,
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
          )}

          {!reachedEnd || selectedCategory?.id == 0 ? (
            <TouchableOpacity
              style={styles.cartContainerStyle}
              onPress={_onSelect}>
              <AD
                name="shoppingcart"
                size={moderateVerticalScale(25)}
                color={colors.text_inverse}
                style={{ width: moderateVerticalScale(27) }}
              />
              {reduxData?.cart?.amount != 0 && (
                <View style={styles.cartAmountStyle}>
                  <MyText
                    label={
                      reduxData?.cart?.amount > 99
                        ? '99+'
                        : reduxData?.cart?.amount
                    }
                    size={'subTitle'}
                    textStyle={{ color: colors.text_normal }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cartButtonStyle}
              onPress={_onSelect}>
              <AD
                name="shoppingcart"
                size={moderateVerticalScale(28)}
                color={colors.text_inverse}
                style={{
                  position: 'absolute',
                  left: moderateVerticalScale(14),
                }}
              />
              <MyText
                label={'Checkout Cart'}
                title
                textStyle={{ color: colors.text_inverse }}
              />
              {reduxData?.cart?.amount != 0 && (
                <View style={styles.cartCountStyle}>
                  <MyText
                    label={
                      reduxData?.cart?.amount > 99
                        ? '99+'
                        : reduxData?.cart?.amount
                    }
                    size={'subTitle'}
                    textStyle={{ color: colors.text_inverse }}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <BlurBackground show={isModal} />
    </>
  );
}

export default Home;
