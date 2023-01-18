import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { addItem, clearCart, increase } from '../../../features/cart/cartSlice';
import { Delivery } from '../../../assets/images';
import { BlurBackground, MyText } from '../../../components';
import { PLACE_ORDER } from '../../../graphQL/mutation/order.mutation';
import { colors } from '../../../theme';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { isValidTimeToOrder } from '../../../utils/helperFunctions';
import { showMessage } from 'react-native-flash-message';
import { useLayoutAnimation } from '../../../utils/hooks/useUpdateEffect/useLayoutAnimation';

const { width, height } = Dimensions.get('window');

function Cart({ route, navigation }) {
  const timer = useRef();
  const [isEditQty, setIsEditQty] = useState(false);
  const [showAlert, isShowAlert] = useState(false);
  const [getData, setGetData] = useState({});
  const [isIndexSame, setIsIndexSame] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);

  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const userData = useSelector(store => store?.userInfo?.userData);
  const [CreateOrder, { loading, error }] = useMutation(PLACE_ORDER);

  async function getCurrentTime() {
    try {
      const response = await fetch('https://www.google.com/search?q=time');
      const data = response;
      const currentTime = data.headers?.map.date;
      setCurrentTime(currentTime);
      return new Date(moment(currentTime));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    var makeTotal = 0;
    if (count?.cart?.cartItems) {
      count?.cart?.cartItems.map((item, index) => {
        makeTotal = makeTotal + item.price * item.quantity;
      });
    }
    setTotal(makeTotal);
  }, [count?.cart?.cartItems]);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIsEditQty(false);
    }, 3000);
  }, [isEditQty, getData, isIndexSame]);

  const onHandleEditQty = index => {
    setIsEditQty(true);
    setIsIndexSame(index);
  };

  useEffect(() => {
    useLayoutAnimation();
  }, [isEditQty, isIndexSame]);

  const addToCart = (item, value, index) => {
    if (Number(value) > 99) {
      showMessage({
        message: 'Warning',
        description: 'Woah! you have reached the limit!!!',
        type: 'info',
        icon: 'auto',
      });
      setIsEditQty(false);
    } else {
      var changeData = { ...item };
      changeData.quantity = value;
      setGetData(changeData);
      // useLayoutAnimation();
      if (count?.cart?.cartItems.length == 1 && index == 0 && value == 0) {
        showMessage({
          message: 'Warning',
          description: `Your cart is empty\nPlease add some items in your cart.`,
          type: 'warning',
          icon: 'auto',
        });
        navigation.navigate('Home');
      }
    }
  };

  const removefromCart = (item, value, index) => {
    var changeData = { ...item };
    changeData.quantity = value;
    setGetData(changeData);
    if (count?.cart?.cartItems.length == 1 && index == 0) {
      showMessage({
        message: 'Warning',
        description: `Your cart is empty\nPlease add some items in your cart.`,
        type: 'warning',
        icon: 'auto',
      });
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    if (Object.keys(getData).length != 0) {
      dispatch(addItem(getData));
      dispatch(increase());
    }
  }, [getData]);

  const handleShowAlert = async () => {
    isShowAlert(false);
    const cartItems = count?.cart?.cartItems?.map(val => {
      return {
        itemId: val?.id,
        quantity: val?.quantity,
        amount: val?.quantity * val?.price,
        note: val?.note || '',
      };
    });

    try {
      await CreateOrder({
        variables: {
          input: {
            userId: userData?.id,
            totalAmount: total,
            items: cartItems,
          },
        },
      });
      navigation.navigate('OrderConfirm');
    } catch (error) {
      console.log('CreateOrder error', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors?.background }}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="md-close"
              size={moderateVerticalScale(28)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <MyText
              label={'Cart'}
              size={'subHeading'}
              textStyle={{ fontFamily: 'Poppins-Medium' }}
            />
            <MyText
              label={'Check your menu'}
              textStyle={{ color: '#00000060' }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.background,
            paddingVertical: moderateVerticalScale(10),
            borderBottomWidth: moderateVerticalScale(1),
            borderColor: '#ccc',
          }}>
          <View style={styles.deliveryOptionContainer}>
            <Image
              source={Delivery}
              style={{
                height: moderateVerticalScale(75),
                width: moderateVerticalScale(80),
              }}
            />
            <View style={styles.headerText}>
              <MyText label={'Hurry up 😀'} />
              <MyText
                label={`We are waiting for your order!`}
                size="subTitle"
                textStyle={{ color: '#00000060' }}
              />
            </View>
          </View>
        </View>
        <View style={styles.cartItemContainer}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => setIsEditQty(false)}>
              <View>
                {count?.cart?.cartItems &&
                  count?.cart?.cartItems.map((item, index) => (
                    <View style={styles.cartItemInner} key={index}>
                      <View style={{ alignItems: 'center' }}>
                        {isEditQty && isIndexSame == index && (
                          <TouchableOpacity
                            style={{
                              width: moderateVerticalScale(33),
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: '#00000050',
                              borderRadius: 5,
                              backgroundColor: colors.background,
                              padding: moderateVerticalScale(3),
                              elevation: moderateVerticalScale(2),
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: moderateVerticalScale(1),
                              },
                              shadowOpacity: moderateVerticalScale(0.20),
                              shadowRadius: moderateVerticalScale(1.41),
                            }}
                            onPress={() => addToCart(item, item.quantity + 1)}>
                            <Icon
                              name="caret-up"
                              size={moderateVerticalScale(15)}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          disabled={isEditQty && isIndexSame == index}
                          style={{
                            borderColor:
                              isEditQty && isIndexSame == index
                                ? '#00000050'
                                : '#000',
                            ...styles.qtyButtonContainer,
                          }}
                          onPress={() => onHandleEditQty(index)}>
                          <MyText
                            label={item.quantity}
                            textStyle={{ margin: moderateVerticalScale(1) }}
                          />
                          {!(isEditQty && isIndexSame == index) && (
                            <Icon
                              name="caret-down"
                              size={moderateVerticalScale(11)}
                              color="#000"
                            />
                          )}
                        </TouchableOpacity>
                        {isEditQty && isIndexSame == index && (
                          <TouchableOpacity
                            disabled={item.quantity == 1}
                            style={{
                              width: moderateVerticalScale(33),
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor:
                                item.quantity != 1 ? '#00000050' : '#0000004f',
                              borderRadius: 5,
                              backgroundColor:
                                item.quantity != 1
                                  ? colors.background
                                  : colors.disabledBackground,
                              padding: moderateVerticalScale(3),
                              elevation: item.quantity != 1 ? moderateVerticalScale(2) : 0,
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: moderateVerticalScale(1),
                              },
                              shadowOpacity: item.quantity != 1 ? moderateVerticalScale(0.20) : 0,
                              shadowRadius: item.quantity != 1 ? moderateVerticalScale(1.41) : 0,
                            }}
                            onPress={() =>
                              addToCart(item, item.quantity - 1, index)
                            }>
                            <Icon
                              name="caret-down"
                              size={moderateVerticalScale(15)}
                              color={colors.primary}
                              style={{ opacity: item.quantity != 1 ? 1 : 0.3 }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          navigation.navigate('Item', {
                            foodType: item.foodType,
                            item: item,
                          })
                        }
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: moderateVerticalScale(45),
                              width: moderateVerticalScale(60),
                              backgroundColor: colors.background,
                              borderRadius: height * 0.015,
                              marginHorizontal: moderateVerticalScale(5),
                              elevation: moderateVerticalScale(2),
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: moderateVerticalScale(1),
                              },
                              shadowOpacity: moderateVerticalScale(0.20),
                              shadowRadius: moderateVerticalScale(1.41),
                            }}>
                            <Image
                              source={{ uri: item.image }}
                              style={{
                                height: moderateVerticalScale(45),
                                width: moderateVerticalScale(60),
                                borderRadius: height * 0.015,
                              }}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <MyText
                              label={item.name}
                              numberOfLines={2}
                              textStyle={{
                                color: colors.primary,
                              }}
                            />
                          </View>
                        </View>
                        <MyText
                          label={`Rs. ${item.price * item.quantity}`}
                          size={'title'}
                          textStyle={{
                            alignItems: 'flex-end',
                            marginLeft: moderateVerticalScale(10),
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteItem}
                        onPress={() => removefromCart(item, 0, index)}>
                        <AD
                          name="minus"
                          size={moderateVerticalScale(15)}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.addMoreItemContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MyText
                label={'Add more Items'}
                title
                textStyle={{
                  color: colors.primary,
                  textDecorationLine: 'underline',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.totalAmountContainer}>
            <MyText
              label={'Total'}
              size={moderateVerticalScale(20)}
              textStyle={{ fontFamily: 'Poppins-SemiBold' }}
            />
            <MyText
              label={`Rs. ${total}`}
              size={moderateVerticalScale(20)}
              textStyle={{ fontFamily: 'Poppins-SemiBold' }}
            />
          </View>
          <View style={styles.ProceedToCheckOut}>
            <TouchableOpacity
              disabled={count?.cart?.cartItems.length == 0}
              style={{
                backgroundColor: colors.primary,
                height: moderateVerticalScale(40),
                borderRadius: height * 0.005,
                paddingLeft: height * 0.015,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: moderateVerticalScale(10),
                elevation: moderateVerticalScale(2),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: moderateVerticalScale(1),
                },
                shadowOpacity: moderateVerticalScale(0.20),
                shadowRadius: moderateVerticalScale(1.41),
              }}
              onPress={async () => {
                // //! Uncomment when need to apply restriction
                const time = await getCurrentTime();

                if (!isValidTimeToOrder(time)) {
                  showMessage({
                    message: 'Alas! Time is over for placing order😬',
                    icon: 'auto',
                    type: 'info',
                  });
                  return;
                }
                isShowAlert(true);
              }}>
              {!loading ? (
                <MyText
                  label={
                    count?.cart?.cartItems?.length != 0
                      ? 'Proceed to checkout'
                      : 'Please add item into cart'
                  }
                  title
                  textStyle={{ color: colors.background }}
                />
              ) : (
                <ActivityIndicator size="large" color={colors.text_inverse} />
              )}
            </TouchableOpacity>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Confirm Order"
              message="Are you sure you want to confirm your order?"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              alertContainerStyle={{
                backgroundColor: 'rgba(52,52,52,0.5)',
              }}
              overlayStyle={{
                backgroundColor: 'transparent',
              }}
              contentContainerStyle={{
                borderRadius: moderateVerticalScale(10),
              }}
              titleStyle={{
                fontSize: moderateVerticalScale(20),
                fontFamily: 'Poppins-Bold',
              }}
              messageStyle={{
                fontSize: moderateVerticalScale(12),
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}
              cancelButtonTextStyle={{
                fontSize: moderateVerticalScale(13),
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}
              confirmButtonTextStyle={{
                fontSize: moderateVerticalScale(13),
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}
              cancelText="No, Cancel"
              confirmText="Yes, Confirm"
              cancelButtonColor="#00000060"
              confirmButtonColor={colors.primary}
              onCancelPressed={() => {
                isShowAlert(false);
              }}
              onConfirmPressed={handleShowAlert}
            />
          </View>
        </View>
      </View>
      <BlurBackground show={showAlert} />
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  // Header Container
  headerContainer: {
    height: moderateVerticalScale(80),
    backgroundColor: colors.background,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.02,
  },
  headerText: {
    marginLeft: height * 0.02,
  },
  headerProgressContiner: {
    position: 'absolute',
    right: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Delivery Option Container
  deliveryOptionContainer: {
    height: moderateVerticalScale(80),
    backgroundColor: colors.background,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateVerticalScale(15),
    marginHorizontal: moderateVerticalScale(15),
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
  // Cart Item Container
  cartItemContainer: {
    flex: 1,
    // maxHeight: height * 0.52,
    flexDirection: 'row',
  },
  cartItemInner: {
    width: '95%',
    padding: moderateVerticalScale(5),
    margin: moderateVerticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: moderateVerticalScale(5),
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
  addMoreItemContainer: {
    width: '97%',
    paddingLeft: height * 0.025,
    // justifyContent: 'center',
  },
  qtyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: moderateVerticalScale(33),
    height: moderateVerticalScale(33),
    justifyContent: 'center',
    marginVertical: moderateVerticalScale(5),
    borderRadius: moderateVerticalScale(5),
  },
  deleteItem: {
    height: moderateVerticalScale(22),
    width: moderateVerticalScale(22),
    backgroundColor: colors.primary,
    borderRadius: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateVerticalScale(-5),
    top: moderateVerticalScale(-4),
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
  // Footer Container
  footerContainer: {
    width: width * 1,
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: moderateVerticalScale(1),
    borderColor: '#ccc',
  },
  totalAmountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  ProceedToCheckOut: {
    // height: height * 0.09,
    width: width * 0.9,
  },
});
