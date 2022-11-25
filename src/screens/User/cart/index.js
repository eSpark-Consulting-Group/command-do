import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import AwesomeAlert from 'react-native-awesome-alerts';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Ionicons';

import {Fonts} from '../../../utils/fonts';
import {addItem, clearCart, increase} from '../../../features/cart/cartSlice';
import {Delievey} from '../../../assets/images';
import {MyText, DropDownAlert} from '../../../components';
import {useMutation} from '@apollo/client';
import {PLACE_ORDER} from '../../../graphQL/mutation/order.mutation';
import {colors} from '../../../theme';

const {width, height} = Dimensions.get('window');

function Cart({route, navigation}) {
  const qtyWarn = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditQty, setIsEditQty] = useState(false);
  const [showAlert, isShowAlert] = useState(false);
  const [getData, setGetData] = useState({});
  const [progress, setProgress] = useState(0.3);
  const [isIndexSame, setIsIndexSame] = useState(0);
  const [total, setTotal] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(
    new Animated.Value(height * 0.0012),
  );
  const [progressText, setProgresText] = useState('Menu');
  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const [press, setPress] = useState(false);
  const userData = useSelector(store => store?.userInfo?.userData);
  const [CreateOrder, {loading, error}] = useMutation(PLACE_ORDER);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.7);
      setTimeout(() => {
        setProgresText('Cart');
        Animated.spring(animatedValue, {
          toValue: height * 0.0016,
          friction: 1,
          tension: 100,
          useNativeDriver: true,
        }).start();
      }, 200);
    }, 300);
  }, []);

  useEffect(() => {
    var makeTotal = 0;
    if (count?.cart?.cartItems) {
      count?.cart?.cartItems.map((item, index) => {
        makeTotal = makeTotal + item.price * item.quantity;
      });
    }
    setTotal(makeTotal);
  }, [count?.cart?.cartItems]);

  const onHandleEditQty = index => {
    setIsEditQty(false);
    clearTimeout(timer);
    setIsEditQty(true);
    setIsIndexSame(index);
    setIsEditQty(true);
    const timer = setTimeout(() => {
      setIsEditQty(false);
      clearTimeout(timer);
    }, 3000);
  };

  const addToCart = (item, value) => {
    if (value != '') {
      if (Number(value) > 999) {
        qtyWarn.current();
        setIsEditQty(false);
      } else {
        var changeData = {...item};
        changeData.quantity = value;
        setGetData(changeData);
      }
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
      <TouchableWithoutFeedback onPress={() => setIsEditQty(false)}>
        <View style={{flex: 1}}>
          <DropDownAlert
            childFunc={qtyWarn}
            setPress={() => setPress(false)}
            message={'Woah! you have reached the limit!!!'}
            type="info"
            title="Warning"
          />
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
            <View style={styles.headerProgressContiner}>
              <Animated.View
                useNativeDriver={true}
                style={{
                  position: 'absolute',
                  transform: [{scale: animatedValue}],
                }}>
                <MyText
                  label={progressText}
                  subTitle
                  textStyle={{color: '#00000080'}}
                />
              </Animated.View>
              <Progress.Circle
                size={height * 0.09}
                progress={progress}
                thickness={height * 0.005}
                color={colors.primary}
                borderWidth={0}
                unfilledColor="#00000020"
              />
            </View>
          </View>
          <View style={styles.deliveryOptionContainer}>
            <Image
              source={Delievey}
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
          <View style={styles.cartItemContainer}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {count?.cart?.cartItems &&
                count?.cart?.cartItems.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.cartItemInner}
                    key={index}
                    onPress={() =>
                      navigation.navigate('Item', {
                        foodType: item.foodType,
                        item: item,
                      })
                    }>
                    {isEditQty && isIndexSame == index && (
                      <NumericInput
                        value={Number(item.quantity)}
                        onChange={value => addToCart(item, value)}
                        maxValue={999}
                        extraTextInputProps={{
                          onSubmitEditing: () => setIsEditQty(false),
                        }}
                        totalWidth={height * 0.17}
                        totalHeight={height * 0.09}
                        iconSize={height * 0.01}
                        valueType="integer"
                        rounded
                        separatorWidth={0}
                        textColor={colors.primary}
                        iconStyle={{color: 'black'}}
                        inputStyle={{
                          fontSize: height * 0.03,
                          fontFamily: Fonts.Roboto_Regular,
                        }}
                        borderColor="#00000050"
                        containerStyle={{
                          position: 'absolute',
                          zIndex: 1,
                          backgroundColor: 'white',
                          elevation: height * 0.005,
                          borderWidth: height * 0.001,
                          borderRadius: height * 0.01,
                        }}
                        rightButtonBackgroundColor="#fff"
                        leftButtonBackgroundColor="#fff"
                      />
                    )}
                    <TouchableOpacity
                      style={styles.qtyButtonContainer}
                      onPress={() => onHandleEditQty(index)}>
                      <MyText label={item.quantity} />
                      <Icon
                        name="caret-down"
                        size={height * 0.02}
                        color="#000"
                        style={{
                          paddingRight: height * 0.005,
                          left: height * 0.005,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        elevation: height * 0.003,
                        height: height * 0.08,
                        width: height * 0.1,
                        backgroundColor: 'white',
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
                      title
                      textStyle={{color: colors.primary, width: height * 0.13}}
                    />
                    <MyText
                      label={`Rs.${item.price * item.quantity}`}
                      title
                      textStyle={{
                        textAlign: 'right',
                        position: 'absolute',
                        right: height * 0,
                        width: height * 0.1,
                        flexWrap: 'wrap',
                      }}
                    />
                    <TouchableOpacity
                      style={styles.deleteItem}
                      onPress={() => removefromCart(item, 0)}>
                      <Icon
                        name="md-trash-outline"
                        size={height * 0.02}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <View style={styles.addMoreItemContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MyText
                label={'Add more Items 😋'}
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
                    textStyle={{color: 'white'}}
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
                titleStyle={{
                  fontSize: height * 0.03,
                  fontFamily: Fonts.Roboto_Bold,
                }}
                messageStyle={{
                  fontSize: height * 0.018,
                  fontFamily: Fonts.Roboto_Medium,
                  textAlign: 'center',
                }}
                cancelButtonTextStyle={{
                  fontSize: height * 0.018,
                  fontFamily: Fonts.Roboto_Regular,
                  textAlign: 'center',
                }}
                confirmButtonTextStyle={{
                  fontSize: height * 0.018,
                  fontFamily: Fonts.Roboto_Regular,
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
    height: height * 0.12,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: height * 0.0005,
    borderBottomColor: '#00000050',
  },
  addMoreItemContainer: {
    height: height * 0.06,
    paddingLeft: height * 0.025,
    justifyContent: 'center',
  },
  qtyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: height * 0.001,
    borderRadius: height * 0.005,
    padding: height * 0.007,
  },
  deleteItem: {
    height: height * 0.03,
    elevation: height * 0.003,
    width: height * 0.03,
    backgroundColor: colors.primary,
    borderRadius: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: height * 0.01,
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
