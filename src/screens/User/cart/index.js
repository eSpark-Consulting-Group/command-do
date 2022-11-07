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
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import AwesomeAlert from 'react-native-awesome-alerts';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Ionicons';

import {Fonts} from '../../../utils/fonts';
import {addItem, increase} from '../../../features/cart/cartSlice';
import {Delievey} from '../../../assets/images';
import {MyText, DropDownAlert} from '../../../components';

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

  useEffect(() => {
    // console.log("count", count);
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
        makeTotal = makeTotal + item.price * item.qty;
      });
    }
    setTotal(makeTotal);
    if (count?.cart?.cartItems.length == 0) {
      navigation.goBack();
    }
  }, [count?.cart?.cartItems]);

  useEffect(() => {
    // console.log("timer--->",timer);
  }, []);

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
    // console.log('value---->', value);
    if (Number(value) > 999) {
      qtyWarn.current();
      setIsEditQty(false);
    } else {
      var changeData = {...item};
      changeData.qty = value;
      setGetData(changeData);
    }
  };

  useEffect(() => {
    // const payload = {
    // 	foodType: getRouteData?.foodType,
    // 	getData
    // }
    // setAllData(foodName[0].data)
    if (Object.keys(getData).length != 0) {
      // console.log('run or not-->',getData);
      dispatch(addItem(getData));
      dispatch(increase());
      // navigation.goBack()
    }
  }, [getData]);

  const handleShowAlert = () => {
    isShowAlert(false);
    navigation.navigate('OrderConfirm');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={() => setIsEditQty(false)}>
        <View style={{height: height * 1, backgroundColor: 'white'}}>
          <DropDownAlert
            childFunc={qtyWarn}
            setPress={() => setPress(false)}
            message={'Woah! you have reached the limit!!!'}
            type="info"
            title="Warning"
          />
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="md-close" size={height * 0.04} color="#11a79c" />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <MyText label={'Cart'} subHeading />
              <MyText
                label={'Check your menu'}
                subTitle
                style={{color: '#00000060'}}
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
                  style={{color: '#00000080'}}
                />
              </Animated.View>
              <Progress.Circle
                size={height * 0.09}
                progress={progress}
                thickness={height * 0.005}
                color="#11a79c"
                borderWidth={0}
                unfilledColor="#00000020"
              />
              {/* 
          <Text style={{}}>

          </Text> */}
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
                subTitle
                style={{color: '#00000060'}}
              />
            </View>
          </View>
          <View style={styles.cartItemContainer}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {count?.cart?.cartItems &&
                count?.cart?.cartItems.map((item, index) => (
                  // console.log(item),
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
                        value={Number(item.qty)}
                        onChange={value => addToCart(item, value)}
                        maxValue={999}
                        // onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                        totalWidth={height * 0.17}
                        totalHeight={height * 0.09}
                        iconSize={height * 0.01}
                        // step={1.5}
                        valueType="integer"
                        rounded
                        separatorWidth={0}
                        textColor="#11a79c"
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
                          // borderColor:'#00000050',
                          borderRadius: height * 0.01,
                        }}
                        rightButtonBackgroundColor="#fff"
                        leftButtonBackgroundColor="#fff"
                      />
                    )}
                    <TouchableOpacity
                      style={styles.qtyButtonContainer}
                      onPress={() => onHandleEditQty(index)}>
                      <MyText label={item.qty} />
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
                        source={item.image}
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
                      style={{color: '#11a79c', width: height * 0.13}}
                    />
                    <MyText
                      label={`Rs.${item.price * item.qty}`}
                      title
                      style={{
                        textAlign: 'right',
                        position: 'absolute',
                        right: height * 0,
                        width: height * 0.1,
                        flexWrap: 'wrap',
                      }}
                    />
                    <TouchableOpacity
                      style={styles.deleteItem}
                      onPress={() => addToCart(item, 0)}>
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
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => navigation.goBack()}>
              <MyText
                label={'Add more Items 😋'}
                title
                textStyle={{color: '#11a79c', textDecorationLine: 'underline'}}
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
                style={{
                  backgroundColor: '#11a79c',
                  height: height * 0.06,
                  borderRadius: height * 0.005,
                  paddingLeft: height * 0.015,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: height * 0.003,
                  marginVertical: height * 0.009,
                }}
                onPress={() => isShowAlert(true)}>
                <MyText
                  label={'Proceed to checkout'}
                  title
                  style={{color: 'white'}}
                />
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
                confirmButtonColor="#11a79c"
                onCancelPressed={() => {
                  isShowAlert(false);
                }}
                onConfirmPressed={handleShowAlert}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

// trash-outline

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
    // textAlign:''
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
    // minHeight: height * .1,
    maxHeight: height * 0.52,
    flexDirection: 'row',
    paddingHorizontal: height * 0.02,
    // backgroundColor: 'red'
  },
  cartItemInner: {
    height: height * 0.12,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: height * 0.0005,
    borderBottomColor: '#00000050',
    // backgroundColor: 'red'
  },

  addMoreItemContainer: {
    height: height * 0.06,
    paddingLeft: height * 0.025,
    justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
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
    backgroundColor: '#11a79c',
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
    // backgroundColor: 'red',
    // flexDirection: 'row',
    // paddingHorizontal: height * .02,
    // backgroundColor: 'blue',
    justifyContent: 'flex-end',
  },
  totalAmountContainer: {
    // height: height * .12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  ProceedToCheckOut: {
    height: height * 0.09,
    width: width * 0.9,
    // flexDirection: 'row',
  },
});
