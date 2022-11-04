import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  LayoutAnimation,
  KeyboardAvoidingView,
  UIManager,
  Platform,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {MyText, DropDownAlert} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../utils/fonts';
import AnimatedNumbers from 'react-native-animated-numbers';
import {
  removeItem,
  addItem,
  increase,
  decrease,
} from '../../features/cart/cartSlice';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');

function Items({route, navigation}) {
  const getRouteData = route.params;
  const childFunc = React.useRef(null);
  const qtyWarn = React.useRef(null);
  const count = useSelector(store => store);
  const [getData, setGetData] = useState(getRouteData.item);
  const [editData, setEditData] = useState([]);
  const [editMode, setEditMode] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [press, setPress] = useState(false);
  const [message, setMessage] = useState('');
  const [animateToNumber, setAnimateToNumber] = useState(0);
  const dispatch = useDispatch();
  // const getData = route.params;

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    // console.log('count?.cart?.cartItems---->', count?.cart?.cartItems);
    // console.log(getData.qty = animateToNumber, 'animateToNumber');
    // setAllData(foodName[0].data)
    var data = [];
    // console.log(count?.cart, 'count');
    // const checkCountData =
    data = count?.cart?.cartItems.filter(item => item?.name === getData.name);
    setEditData(data);
    setEditMode(data.length != 0 ? data[0]?.qty : 0);
    setAnimateToNumber(data.length != 0 ? data[0]?.qty : 0);
    // console.log(editData?.length == 0 ? animateToNumber === editMode : animateToNumber == 0, 'animateToNumber');
  }, [count]);

  const addQty = () => {
    if (editMode > 998) {
      qtyWarn.current();
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
    // console.log('value---->', value);
    var changeData = {...getData};
    changeData.qty = value;
    setGetData(changeData);
  };

  const onChangeNumber = value => {
    if (Number(value) > 999) {
      qtyWarn.current();
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
    const payload = {
      foodType: getRouteData?.foodType,
      getData,
    };
    // setAllData(foodName[0].data)
    if (animateToNumber != 0) {
      dispatch(addItem(getData));
      dispatch(increase());
      // navigation.goBack()
    }
  }, [getData]);

  // useEffect(() => {
  // 	if(message.length != 0){
  // 		console.log(message);
  // 		childFunc.current()
  // 		setPress(true)
  // 	}
  // }, [message])

  const checkSetPress = () => {
    // console.log("runasldkj");
    setMessage('');
    setPress(false);
  };

  const _onSelect = () => {
    if (count?.cart?.amount == 0) {
      setMessage('Cart');
      childFunc.current();
      setPress(true);
      // setMessage(`Your cart is empty\nPlease add some items in your cart.`)
    } else {
      navigation.goBack();
      navigation.navigate('Cart');
    }
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <DropDownAlert
        childFunc={childFunc}
        setPress={checkSetPress}
        message={`Your cart is empty\nPlease add some items in your cart.`}
        type="info"
        title="Warning"
      />
      <DropDownAlert
        childFunc={qtyWarn}
        setPress={checkSetPress}
        message={'Woah! you have reached the limit!!!'}
        type="info"
        title="Warning"
      />
      <View style={styles.mainContainer}>
        <View style={styles.itemImageContainer}>
          <ImageBackground
            source={{uri: getData.image}}
            style={styles.imageBackground}>
            <TouchableOpacity
              style={styles?.itemImageBackIcon}
              onPress={() => navigation.goBack()}>
              <Icon
                name="ios-chevron-back-outline"
                size={height * 0.03}
                color="#11a79cc7"
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.itemDetailContainer}>
          <View style={styles.subHeadingContainer}>
            <MyText label={getData.name} textStyle={{fontSize: height * 0.03}} />
            {(editData?.length == 0 ? animateToNumber != 0 : editMode != 0) ? (
              <View style={styles.numericBtnContainer}>
                <TouchableOpacity
                  style={styles.removeNumericButton}
                  onPress={removeQty}>
                  <Icon name="remove" size={height * 0.03} color="white" />
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  onChangeText={onChangeNumber}
                  value={editMode.toString()}
                  textAlign="center"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.addNumericButton}
                  onPress={addQty}>
                  <Icon name="add" size={height * 0.03} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  borderRadius: height * 1,
                  backgroundColor: '#11a79c',
                  elevation: 3,
                  height: height * 0.05,
                  width: height * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={addQty}>
                <Icon name="add" size={height * 0.03} color="white" />
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={{width: '100%', marginTop: height * 0.02}}>
            <MyText
              label={getData.desc}
              subTitle
              style={{color: 'gray', width: width * 0.7}}
            />
          </View> */}
          <View style={{width: '100%', marginTop: height * 0.02}}>
            <MyText label={'Amount'} textStyle={{fontSize: height * 0.025}} />
            <MyText label={getData.price} textStyle={{fontSize: height * 0.025}} />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: height * 0.02,
            }}>
            <MyText label={'Special Instruction'} title />
            <MyText
              label={
                'Please let us know if you are alergic to anything or if we need to avoid anything'
              }
              subTitle
              style={{color: 'gray', width: width * 0.7}}
            />
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <TextInput
              placeholder="e.g no mayo"
              style={styles.noteStyle}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={8}
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: height * 0.0,
            }}>
            <TouchableOpacity
              disabled={count?.cart?.amount == 0 && press}
              style={styles.cartButtonStyle}
              onPress={_onSelect}>
              {count?.cart?.amount != 0 && (
                <View style={styles.cartCountStyle}>
                  <MyText
                    label={
                      count?.cart?.amount > 99 ? '99+' : count?.cart?.amount
                    }
                    subTitle
                    style={{
                      color: 'white',
                    }}
                  />
                </View>
              )}
              <MyText label={'Check You Cart'} title style={{color: 'white'}} />
              <Icon
                name="cart-outline"
                size={height * 0.03}
                color="#fff"
                style={{
                  position: 'absolute',
                  right: height * 0.01,
                  transform: [{scaleX: -1}],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Items;
