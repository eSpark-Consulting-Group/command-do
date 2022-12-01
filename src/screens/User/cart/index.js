import React, {useState, useEffect, useRef} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';
import {useMutation} from '@apollo/client';

import {addItem, clearCart, increase} from '../../../features/cart/cartSlice';
import {Delivery} from '../../../assets/images';
import {MyText} from '../../../components';
import {PLACE_ORDER} from '../../../graphQL/mutation/order.mutation';
import {colors} from '../../../theme';
import {moderateVerticalScale} from 'react-native-size-matters';
import {isValidTimeToOrder} from '../../../utils/helperFunctions';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAvoidingView} from 'react-native';
import {SCREEN_WIDTH} from '../../../constants';
import {useLayoutAnimation} from '../../../utils/hooks/useUpdateEffect/useLayoutAnimation';

const {width, height} = Dimensions.get('window');

function Cart({route, navigation}) {
  const timer = useRef();
  const [isEditQty, setIsEditQty] = useState(false);
  const [showAlert, isShowAlert] = useState(false);
  const [getData, setGetData] = useState({});
  const [isIndexSame, setIsIndexSame] = useState(0);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const userData = useSelector(store => store?.userInfo?.userData);
  const [CreateOrder, {loading, error}] = useMutation(PLACE_ORDER);

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
    if (count?.cart?.cartItems.length < 1) {
      showMessage({
        message: 'Warning',
        description: `Your cart is empty\nPlease add some items in your cart.`,
        type: 'warning',
        icon: 'auto',
      });
      navigation.goBack();
    }
  }, [count?.cart?.cartItems]);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIsEditQty(false);
    }, 3000);
  }, [isEditQty, getData]);

  const onHandleEditQty = index => {
    setIsEditQty(true);
    setIsIndexSame(index);
  };

  useEffect(() => {
    useLayoutAnimation();
  }, [isEditQty, isIndexSame]);

  const addToCart = (item, value) => {
    if (Number(value) > 99) {
      showMessage({
        message: 'Warning',
        description: 'Woah! you have reached the limit!!!',
        type: 'info',
        icon: 'auto',
      });
      setIsEditQty(false);
    } else {
      var changeData = {...item};
      changeData.quantity = value;
      setGetData(changeData);
    }
  };

  const removefromCart = (item, value) => {
    var changeData = {...item};
    changeData.quantity = value;
    setGetData(changeData);
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
      dispatch(clearCart());
    } catch (error) {
      console.log('CreateOrder error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors?.background}}>
      <StatusBar backgroundColor={colors.primary} />
      <TouchableWithoutFeedback onPress={() => setIsEditQty(false)}>
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon
                name="md-close"
                size={height * 0.04}
                color={colors.primary}
              />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <MyText label={'Cart'} subHeading />
              <MyText
                label={'Check your menu'}
                subTitle
                textStyle={{color: '#00000060'}}
              />
            </View>
          </View>
          <View style={styles.deliveryOptionContainer}>
            <Image
              source={Delivery}
              style={{
                height: height * 0.1,
                width: height * 0.12,
              }}
            />
            <View style={styles.headerText}>
              <MyText label={'Hurry up 😀'} subHeading />
              <MyText
                label={`We are waiting for your order!`}
                size="subTitle"
                textStyle={{color: '#00000060'}}
              />
            </View>
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.cartItemContainer}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {count?.cart?.cartItems &&
                count?.cart?.cartItems.map((item, index) => (
                  <View style={styles.cartItemInner} key={index}>
                    <View>
                      {isEditQty && isIndexSame == index && (
                        <TouchableOpacity
                          style={{
                            width: moderateVerticalScale(40),
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: height * 0.001,
                            borderColor: '#00000050',
                            borderRadius: 5,
                            backgroundColor: colors.background,
                            padding: moderateVerticalScale(3),
                            elevation: 5,
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
                          width: moderateVerticalScale(40),
                          justifyContent: 'center',
                          marginVertical: moderateVerticalScale(5),
                          borderColor:
                            isEditQty && isIndexSame == index
                              ? '#00000050'
                              : '#000',
                          ...styles.qtyButtonContainer,
                        }}
                        onPress={() => onHandleEditQty(index)}>
                        <MyText label={item.quantity} />
                        {!(isEditQty && isIndexSame == index) && (
                          <Icon
                            name="caret-down"
                            size={moderateVerticalScale(15)}
                            color="#000"
                          />
                        )}
                      </TouchableOpacity>
                      {isEditQty && isIndexSame == index && (
                        <TouchableOpacity
                          style={{
                            width: moderateVerticalScale(40),
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: height * 0.001,
                            borderColor: '#00000050',
                            borderRadius: 5,
                            backgroundColor: colors.background,
                            padding: moderateVerticalScale(3),
                            elevation: 5,
                          }}
                          onPress={() => addToCart(item, item.quantity - 1)}>
                          <Icon
                            name="caret-down"
                            size={moderateVerticalScale(15)}
                            color={colors.primary}
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
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            elevation: height * 0.003,
                            height: height * 0.08,
                            width: height * 0.1,
                            backgroundColor: colors.background,
                            marginHorizontal: height * 0.015,
                            borderRadius: height * 0.015,
                          }}>
                          <Image
                            source={{uri: item.image}}
                            style={{
                              height: height * 0.08,
                              width: height * 0.1,
                              borderRadius: height * 0.015,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <MyText
                          label={item.name}
                          numberOfLines={0}
                          textStyle={{
                            color: colors.primary,
                            width: SCREEN_WIDTH * 0.42,
                          }}
                        />
                      </View>
                      <MyText
                        label={`Rs. ${item.price * item.quantity}`}
                        size={'title'}
                        textStyle={{
                          textAlign: 'right',
                          width: height * 0.1,
                          flexWrap: 'wrap',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteItem}
                      onPress={() => removefromCart(item, 0)}>
                      <AD
                        name="delete"
                        size={moderateVerticalScale(15)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </KeyboardAvoidingView>
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
          <View style={styles.footerContainer}>
            <View style={styles.totalAmountContainer}>
              <MyText label={'Total'} subHeading />
              <MyText label={`Rs. ${total}`} title />
            </View>
            <View style={styles.ProceedToCheckOut}>
              <TouchableOpacity
                disabled={count?.cart?.cartItems.length == 0}
                style={{
                  backgroundColor: colors.primary,
                  height: height * 0.06,
                  borderRadius: height * 0.005,
                  paddingLeft: height * 0.015,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: height * 0.003,
                  marginVertical: height * 0.009,
                }}
                onPress={() => {
                  if (!isValidTimeToOrder()) {
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
                    textStyle={{color: colors.background}}
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
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  // Header Container
  headerContainer: {
    height: height * 0.12,
    backgroundColor: colors.background,
    elevation: height * 0.003,
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
    height: height * 0.12,
    backgroundColor: colors.background,
    elevation: height * 0.005,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.02,
    margin: height * 0.02,
  },
  // Cart Item Container
  cartItemContainer: {
    maxHeight: height * 0.52,
    flexDirection: 'row',
    paddingHorizontal: height * 0.02,
  },
  cartItemInner: {
    // height: moderateVerticalScale(110),
    paddingVertical: moderateVerticalScale(5),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#00000050',
  },
  addMoreItemContainer: {
    height: height * 0.06,
    paddingLeft: height * 0.025,
    justifyContent: 'center',
  },
  qtyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: height * 0.001,
    borderRadius: height * 0.005,
    padding: moderateVerticalScale(5),
  },
  deleteItem: {
    height: moderateVerticalScale(22),
    elevation: 5,
    width: moderateVerticalScale(22),
    backgroundColor: colors.primary,
    borderRadius: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateVerticalScale(2),
    top: moderateVerticalScale(2),
  },
  // Footer Container
  footerContainer: {
    width: width * 1,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  totalAmountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  ProceedToCheckOut: {
    height: height * 0.09,
    width: width * 0.9,
  },
});
