import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';

import { MyText, GapView } from '../../../components';
import { addItem, increase } from '../../../features/cart/cartSlice';
import { styles } from './styles';
import { colors } from '../../../theme';
import { moderateVerticalScale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';
import { useKeyboard } from '../../../utils/hooks/useUpdateEffect/useKeyBoard';
import { useLayoutAnimation } from '../../../utils/hooks/useUpdateEffect/useLayoutAnimation';

const { width, height } = Dimensions.get('window');

function Items({ route, navigation }) {
  const getRouteData = route.params;
  const count = useSelector(store => store);
  const cartItems = count?.cart?.cartItems;
  const [getData, setGetData] = useState(getRouteData?.item);
  const dispatch = useDispatch();
  const keyBoardHeight = useKeyboard();
  var data = [];
  data = cartItems.filter(item => item?.name === getData?.name);

  const addQty = val => {
    if (val > 98) {
      showMessage({
        message: 'Woah! you have reached the limit!!!',
        type: 'info',
        title: 'Warning',
      });
    } else {
      useLayoutAnimation();
      addToCart(val);
    }
  };

  const removeQty = val => {
    useLayoutAnimation();
    addToCart(val);
  };

  const addToCart = value => {
    var changeData = { ...getData };
    changeData.quantity = value;
    setGetData(changeData);
    dispatch(addItem(changeData));
    dispatch(increase());
  };

  const _onSelect = () => {
    if (count?.cart?.amount == 0) {
      showMessage({
        message: 'Warning',
        description: `Your cart is empty\nPlease add some items in your cart.`,
        type: 'warning',
        icon: 'auto',
      });
    } else {
      navigation.goBack();
      navigation.navigate('Cart');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.itemImageContainer]}>
        <ImageBackground
          source={{ uri: getData?.image }}
          style={styles.imageBackground}>
          <TouchableOpacity
            style={styles?.itemImageBackIcon}
            onPress={() => navigation.goBack()}>
            <Icon
              name="ios-chevron-back-outline"
              size={moderateVerticalScale(20)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.itemDetailContainer}>
        <View style={styles.subHeadingContainer}>
          <View style={{ flex: 1 }}>
            <MyText
              numberOfLines={2}
              label={getData?.name}
              textStyle={{
                fontSize: moderateVerticalScale(20),
              }}
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            {data?.length != 0 ? (
              <View style={styles.numericBtnContainer}>
                <TouchableOpacity
                  style={styles.addNumericButton}
                  onPress={() => {
                    addQty(data[0]?.quantity + 1);
                  }}>
                  <AD
                    name="plus"
                    size={moderateVerticalScale(18)}
                    color={colors.text_inverse}
                  />
                </TouchableOpacity>
                <View style={styles.quantityInput}>
                  <MyText
                    label={data[0]?.quantity?.toString()}
                    textStyle={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: moderateVerticalScale(20),
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.removeNumericButton}
                  onPress={() => {
                    removeQty(data[0]?.quantity - 1);
                  }}>
                  <AD
                    name="minus"
                    size={moderateVerticalScale(18)}
                    color={colors.text_inverse}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: moderateVerticalScale(50),
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: height * 1,
                    backgroundColor: colors.primary,
                    height: moderateVerticalScale(35),
                    width: moderateVerticalScale(35),
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: moderateVerticalScale(2),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: moderateVerticalScale(1),
                    },
                    shadowOpacity: moderateVerticalScale(0.20),
                    shadowRadius: moderateVerticalScale(1.41),
                  }}
                  onPress={() => {
                    addQty(data?.length > 0 ? data[0]?.quantity + 1 : 1);
                  }}>
                  <AD
                    name="plus"
                    size={moderateVerticalScale(18)}
                    color={colors.text_inverse}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <GapView mode="vertical" length={20} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MyText label={'Price'} size="title" />
          <View style={{ flexDirection: 'row' }}>
            <MyText label={'Rs.  '} size="title" />
            <View
              style={{
                backgroundColor: '#ffffff',
                borderWidth: 0.7,
                borderColor: '#c2c2c2',
                borderRadius: 5,
                paddingHorizontal: 10,
                elevation: moderateVerticalScale(1),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: moderateVerticalScale(1),
                },
                shadowOpacity: moderateVerticalScale(0.18),
                shadowRadius: moderateVerticalScale(1.00),
              }}>
              <MyText label={getData?.price} size="title" />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
        }}>
        <TouchableOpacity style={styles.cartButtonStyle} onPress={_onSelect}>
          <Icon
            name="cart-outline"
            size={height * 0.04}
            color={colors.text_inverse}
            style={{
              position: 'absolute',
              left: height * 0.01,
            }}
          />
          <MyText
            label={'Checkout Cart'}
            title
            textStyle={{ color: colors.text_inverse }}
          />
          <View style={styles.cartCountStyle}>
            <MyText
              label={count?.cart?.amount > 99 ? '99+' : count?.cart?.amount}
              textStyle={{ color: colors.text_inverse }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Items;
