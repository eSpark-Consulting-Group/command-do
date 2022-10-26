import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  Cards,
  IndividualCard,
  CustomizeModal,
  MyText,
  DropDownAlert,
} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../utils/fonts';
import {AllData, profileData} from '../../utils/data';
import {
  Biryani,
  FastFood,
  Karahi,
  Roti,
  Snacks,
  Beverages,
  ProfileImage,
} from '../../assets/images';
import {changeType} from '../../features/cart/cartSlice';
import {initialDataUpdate} from '../../features/profile/profileSlice';
import styles from './styles';

const {width, height} = Dimensions.get('window');

function Home({route, navigation}) {
  const childFunc = useRef(null);
  const reduxData = useSelector(store => store);
  const [isModal, setIsModal] = useState(false);
  const [press, setPress] = useState(false);
  const [foodName, setFoodName] = useState([
    {
      name: 'All',
      selected: true,
      data: AllData,
    },
    {
      name: 'Biryani',
      selected: false,
      logo: Biryani,
      data: AllData[1],
    },
    {
      name: 'Salan',
      selected: false,
      logo: Karahi,
      data: AllData[2],
    },
    {
      name: 'Roties',
      selected: false,
      logo: Roti,
      data: AllData[3],
    },
    {
      name: 'FastFood',
      selected: false,
      logo: FastFood,
      data: AllData[0],
    },
    {
      name: 'Snacks',
      selected: false,
      logo: Snacks,
      data: AllData[4],
    },
    {
      name: 'Beverages',
      selected: false,
      logo: Beverages,
      data: AllData[5],
    },
  ]);
  const [allData, setAllData] = useState([]);
  const [checkTab, setCheckTab] = useState('All');

  if (Platform.OS === 'android') {
    // UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const dispatch = useDispatch();

  const isSelect = index => {
    var isFalseArray = [...foodName];
    foodName.map((item, indexx) => {
      if (indexx == index) {
        [...isFalseArray, (isFalseArray[indexx].selected = true)];
        setAllData(item.data);
        setCheckTab(item.name);
        dispatch(changeType(item.name));
      } else {
        [...isFalseArray, (isFalseArray[indexx].selected = false)];
      }
    });
    setFoodName(isFalseArray);
  };

  useEffect(() => {
    setAllData(foodName[0].data);
    dispatch(initialDataUpdate(profileData));
  }, []);

  const _onSelect = () => {
    if (reduxData?.cart?.amount == 0) {
      childFunc.current();
      setPress(true);
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

  const goToNavigation = navigate => {
    navigation.navigate(navigate);
    setIsModal(!isModal);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <DropDownAlert
        childFunc={childFunc}
        setPress={() => setPress(false)}
        message={`Your cart is empty\nPlease add some items in your cart.`}
        type="info"
        title="Warning"
      />
      {/* <StatusBar hiddens={true} /> */}
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
                color="#11a79c"
                style={styles.btnIcon}
              />
              <MyText label={'Profile'} title style={{color: '#00000080'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Icon
                name="settings-sharp"
                size={height * 0.025}
                color="#11a79c"
                style={styles.btnIcon}
              />
              <MyText label={'Setting'} title style={{color: '#00000080'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Icon
                name="ios-newspaper"
                size={height * 0.025}
                color="#11a79c"
                style={styles.btnIcon}
              />
              <MyText label={'Order'} title style={{color: '#00000080'}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, {borderBottomWidth: height * 0}]}
              onPress={() => goToNavigation('Login')}>
              <Icon
                name="ios-exit"
                size={height * 0.025}
                color="#11a79c"
                style={styles.btnIcon}
              />
              <MyText label={'Log out'} title style={{color: '#00000080'}} />
            </TouchableOpacity>
          </View>
        }
      />

      <View
        style={styles.mainContainer}>
        <View
          style={styles.headerContainer}>
          <TouchableOpacity style={{}} onPress={() => setIsModal(!isModal)}>
            <Icon
              name="person-circle-outline"
              size={height * 0.04}
              color="#11a79c90"
            />
          </TouchableOpacity>
          <View style={styles.headerCenterComponentStyle}>
            <TouchableOpacity style={{}}>
              <Icon name="search" size={height * 0.03} color="black" />
            </TouchableOpacity>
            <MyText
              label={"What's your order?🍔"}
              subHeading
              style={{color: '#000000', fontSize: height * 0.025}}
            />
          </View>
          <TouchableOpacity style={{}}>
            <Icon name="wallet-sharp" size={height * 0.035} color="#11a79c90" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: height * 0.02,
          }}>
          <MyText label={`Hi, ${reduxData?.profile?.name}`} heading />
          <MyText label="Good Evening! 🙋‍♂️" subHeading />
          <MyText label="" title />
        </View>
        <View
          style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {foodName.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: item.selected ? '#11a79c' : 'white',
                  elevation: item.selected ? height * 0.003 : 0,
                  paddingHorizontal: item.logo ? height * 0.01 : height * 0.02,
                  borderWidth: item.selected ? 0 : height * 0.001,
                  paddingVertical: height * 0.005,
                  borderColor: '#00000030',
                  marginHorizontal: height * 0.005,
                  borderRadius: height * 0.01,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => isSelect(index)}>
                {item.logo && (
                  <Image
                    source={item.logo}
                    style={styles.categoryImage}
                  />
                )}
                <MyText
                  label={item.name}
                  title
                  style={{color: item.selected ? '#fff' : '#000'}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 4,
          }}>
          {checkTab == 'All' ? (
            <Cards data={allData} navigation={navigation} />
          ) : (
            <IndividualCard data={allData} navigation={navigation} />
          )}
        </View>
        <TouchableOpacity
          style={styles.cartContainerStyle}
          disabled={reduxData?.cart?.amount == 0 && press}
          onPress={_onSelect}>
          <Icon name="cart-outline" size={height * 0.035} color="white" />
          {reduxData?.cart?.amount != 0 && (
            <View
              style={styles.cartAmountStyle}>
              <MyText
                label={
                  reduxData?.cart?.amount > 99 ? '99+' : reduxData?.cart?.amount
                }
                subTitle
                style={{color: '#000'}}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
