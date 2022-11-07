import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Cards,
  IndividualCard,
  CustomizeModal,
  MyText,
  DropDownAlert,
} from '../../../components';
import {AllData, profileData} from '../../../utils/data';
import {initialDataUpdate} from '../../../features/profile/profileSlice';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_ITEMS,
} from '../../../graphQL/query/categories.query';
import {GET_ALL_ITEMS} from '../../../graphQL/query/item.query';
import styles from './styles';

const {width, height} = Dimensions.get('window');

function Home({route, navigation}) {
  const childFunc = useRef(null);
  const reduxData = useSelector(store => store);
  const [isModal, setIsModal] = useState(false);
  const [press, setPress] = useState(false);

  const [allData, setAllData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All',
    image: null,
    id: 0,
  });

  const [LoadCategories, {data: categoriesData}] =
    useLazyQuery(GET_ALL_CATEGORIES);
  const [LoadCategoriesWithItem, {data: categoriesWithItemData}] = useLazyQuery(
    GET_ALL_CATEGORIES_WITH_ITEMS,
  );
  const [LoadItems, {data: itemData, refetch: refetchItems}] =
    useLazyQuery(GET_ALL_ITEMS);
  const categories = categoriesData?.getAllCategories?.data;
  const items =
    selectedCategory?.id == 0
      ? categoriesWithItemData?.getAllCategories?.data
      : itemData?.getAllItems?.data;
  if (Platform.OS === 'android') {
    // UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    LoadCategories();
    LoadCategoriesWithItem();
    LoadItems();
    dispatch(initialDataUpdate(profileData));
  }, []);

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
          where: {
            categoryId: item?.id,
          },
        },
      });
    }
  };

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

  // console.log("items", items)
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
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => goToNavigation('OrderHistory')}>
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

      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{}} onPress={() => setIsModal(!isModal)}>
            <Icon
              name="person-circle-outline"
              size={height * 0.04}
              color="#11a79c90"
            />
          </TouchableOpacity>
          <View style={styles.headerCenterComponentStyle}>
            <TouchableOpacity>
              <Icon name="search" size={height * 0.03} color="black" />
            </TouchableOpacity>
            <MyText
              label={"What's your order?🍔"}
              subHeading
              style={{color: '#000000', fontSize: height * 0.025}}
            />
          </View>
          <TouchableOpacity>
            <Icon name="wallet-sharp" size={height * 0.035} color="#11a79c90" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: height * 0.02,
          }}>
          <MyText
            label={`Hi, ${reduxData?.userInfo?.userData?.firstName}`}
            heading
          />
          <MyText label="Good Evening! 🙋‍♂️" subHeading />
          <MyText label="" title />
        </View>
        <View style={styles.categoryContainer}>
          {categories && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[{name: 'All', image: null, id: 0}, ...categories]?.map(
                (item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectedCategory?.id == item?.id ? '#11a79c' : 'white',
                      elevation:
                        selectedCategory?.id == item?.id ? height * 0.003 : 0,
                      paddingHorizontal: item.logo
                        ? height * 0.01
                        : height * 0.02,
                      borderWidth:
                        selectedCategory?.id == item?.id ? 0 : height * 0.001,
                      paddingVertical: height * 0.005,
                      borderColor: '#00000030',
                      marginHorizontal: height * 0.005,
                      borderRadius: height * 0.01,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    onPress={() => isSelect(item)}>
                    {item.image && (
                      <Image
                        source={{uri: item?.image}}
                        style={styles.categoryImage}
                      />
                    )}
                    <MyText
                      label={item?.name}
                      size={'title'}
                      textStyle={{
                        color:
                          selectedCategory?.id == item?.id ? '#fff' : '#000',
                      }}
                    />
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          )}
        </View>
        <View
          style={{
            flex: 4,
          }}>
          {selectedCategory?.id == 0 ? (
            <Cards data={items || []} navigation={navigation} />
          ) : (
            <IndividualCard data={items || []} navigation={navigation} />
          )}
        </View>
        <TouchableOpacity
          style={styles.cartContainerStyle}
          disabled={reduxData?.cart?.amount == 0 && press}
          onPress={_onSelect}>
          <Icon name="cart-outline" size={height * 0.035} color="white" />
          {reduxData?.cart?.amount != 0 && (
            <View style={styles.cartAmountStyle}>
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
