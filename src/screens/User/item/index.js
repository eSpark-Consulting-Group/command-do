import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';

import {MyText, DropDownAlert, GapView} from '../../../components';
import {addItem, increase} from '../../../features/cart/cartSlice';
import {styles} from './styles';
import {colors} from '../../../theme';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import {Keyboard} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {SCREEN_HEIGHT} from '../../../constants';
import {showMessage} from 'react-native-flash-message';
import {useKeyboard} from '../../../utils/hooks/useUpdateEffect/useKeyBoard';

const {width, height} = Dimensions.get('window');

function Items({route, navigation}) {
  const getRouteData = route.params;
  const childFunc = React.useRef(null);
  const qtyWarn = React.useRef(null);
  const count = useSelector(store => store);
  const [getData, setGetData] = useState(getRouteData?.item);
  const [editData, setEditData] = useState([]);
  const [editMode, setEditMode] = useState(0);
  const [animateToNumber, setAnimateToNumber] = useState(0);
  const dispatch = useDispatch();
  const keyBoardHeight = useKeyboard();
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  console.log('keyBoardHeight', keyBoardHeight);
  useEffect(() => {
    var data = [];

    data = count?.cart?.cartItems.filter(item => item?.name === getData?.name);
    setEditData(data);
    setEditMode(data.length != 0 ? data[0]?.quantity : 0);
    setAnimateToNumber(data.length != 0 ? data[0]?.quantity : 0);
  }, [count]);

  const addQty = () => {
    if (editMode > 998) {
      showMessage({
        message: 'Woah! you have reached the limit!!!',
        type: 'info',
        title: 'Warning',
      });
    } else {
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
      if (editData?.length != 0) {
        setEditMode(editMode + 1);
        addToCart(editMode + 1);
      } else {
        setAnimateToNumber(animateToNumber + 1);
        addToCart(animateToNumber + 1);
      }
    }
  };
  const removeQty = () => {
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
    if (editData?.length != 0) {
      addToCart(editMode - 1);
      setEditMode(editMode - 1);
    } else {
      addToCart(animateToNumber - 1);
      setAnimateToNumber(animateToNumber - 1);
    }
  };

  const addToCart = value => {
    var changeData = {...getData};
    changeData.quantity = value;
    setGetData(changeData);
  };

  const onChangeNumber = value => {
    if (Number(value) > 999) {
      showMessage({
        message: 'Woah! you have reached the limit!!!',
        type: 'info',
        title: 'Warning',
      });
      addQty();
    } else {
      if (editData?.length != 0) {
        setEditMode(Number(value));
        addToCart(Number(value));
      } else {
        setAnimateToNumber(Number(value));
        addToCart(Number(value));
      }
    }
  };
  useEffect(() => {
    if (animateToNumber != 0) {
      dispatch(addItem(getData));
      dispatch(increase());
    }
  }, [getData]);

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

  console.log(Keyboard);
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.itemImageContainer,
              {height: height * 0.75 - keyBoardHeight},
            ]}>
            <ImageBackground
              source={{uri: getData?.image}}
              style={styles.imageBackground}>
              <TouchableOpacity
                style={styles?.itemImageBackIcon}
                onPress={() => navigation.goBack()}>
                <Icon
                  name="ios-chevron-back-outline"
                  size={height * 0.03}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.itemDetailContainer}>
            <View style={styles.subHeadingContainer}>
              <MyText
                numberOfLines={2}
                label={getData?.name}
                size="subHeading"
                textStyle={{
                  width: (
                    editData?.length == 0 ? animateToNumber != 0 : editMode != 0
                  )
                    ? width * 0.6
                    : width * 0.75,
                }}
              />
              {(
                editData?.length == 0 ? animateToNumber != 0 : editMode != 0
              ) ? (
                <View style={styles.numericBtnContainer}>
                  <TouchableOpacity
                    style={styles.removeNumericButton}
                    onPress={removeQty}>
                    <AD
                      name="minus"
                      size={moderateVerticalScale(18)}
                      color={colors.text_inverse}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    onSubmitEditing={val =>
                      onChangeNumber(val?.nativeEvent?.text)
                    }
                    defaultValue={editMode?.toString()}
                    textAlign="center"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.addNumericButton}
                    onPress={addQty}>
                    <AD
                      name="plus"
                      size={moderateVerticalScale(18)}
                      color={colors.text_inverse}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    borderRadius: height * 1,
                    backgroundColor: colors.primary,
                    elevation: 3,
                    height: moderateVerticalScale(35),
                    width: moderateVerticalScale(35),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={addQty}>
                  <AD
                    name="plus"
                    size={moderateVerticalScale(18)}
                    color={colors.text_inverse}
                  />
                </TouchableOpacity>
              )}
            </View>
            <GapView mode="vertical" length={20} />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <MyText label={'Price'} size="title" />

              <View style={{flexDirection: 'row'}}>
                <MyText label={'Rs.  '} size="title" />
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    elevation: 1,
                    borderWidth: 0.7,
                    borderColor: '#c2c2c2',
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}>
                  <MyText label={getData?.price} size="title" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
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
            textStyle={{color: colors.text_inverse}}
          />
          {count?.cart?.amount != 0 && (
            <View style={styles.cartCountStyle}>
              <MyText
                label={count?.cart?.amount > 99 ? '99+' : count?.cart?.amount}
                subTitle
                textStyle={{color: colors.text_inverse}}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Items;
