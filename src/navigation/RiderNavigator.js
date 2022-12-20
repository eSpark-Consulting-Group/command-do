import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MoneyReturn, Orders, PurchasingList} from '../screens';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon as Icons} from '@rneui/themed';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import {BlurBackground, MyHeader, MyText} from '../components';
import {colors} from '../theme';
import {logout} from '../features/userInfo/userInfoSlice';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {StatusBar} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {ALL_ORDERS} from '../graphQL/query/orders.query';

const Stack = createStackNavigator();

function RiderNavigator({navigation}) {
  const [isModal, setIsModal] = useState(false);
  var currDate = new Date().setUTCHours(0);
  const [GetAllOrders, {data, loading: loadOrders}] = useLazyQuery(ALL_ORDERS);

  useEffect(() => {
    GetAllOrders({
      variables: {
        getOrderInput: {},
      },
    });
  }, []);

  let order = data?.getAllOrders?.data?.filter(item => {
    return item?.returned == false && item?.status == 'PAID';
  });

  const finishedStatus = useSelector(
    store => store?.riderOrder.collectionFinished,
  );

  const dispatch = useDispatch();
  console.log('Finished Status', finishedStatus);

  const goToNavigation = navigate => {
    navigation.navigate(navigate);
    setIsModal(!isModal);
  };

  const logoutHandler = () => {
    setIsModal(false);
    dispatch(logout());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Orders"
        component={Orders}
        initialParams={{isModal: isModal}}
        options={{
          headerShown: true,
          header: ({navigation}) => (
            <>
              <StatusBar
                backgroundColor={isModal ? colors.text_normal : colors.primary}
              />
              <MyHeader
                title="Today Orders"
                onPressRight={() => setIsModal(true)}
                titleStyle={{fontFamily: 'Poppins-Bold'}}
                iconComponent={
                  <Menu
                    opened={isModal}
                    onBackdropPress={() => {
                      setIsModal(false);
                      console.log(
                        'setparam',
                        navigation.navigate('Orders', {isModal: false}),
                      );
                    }}
                    renderer={renderers.Popover}
                    rendererProps={{
                      placement: 'bottom',
                    }}>
                    <MenuTrigger
                      children={
                        <>
                          {order?.length > 0 && (
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {
                                setIsModal(true);
                                console.log(
                                  'setparam',
                                  navigation.navigate('Orders', {
                                    isModal: true,
                                  }),
                                );
                              }}
                              style={{
                                backgroundColor: 'red',
                                width: moderateVerticalScale(10),
                                height: moderateVerticalScale(10),
                                borderRadius: 40,
                                position: 'absolute',
                                top: moderateVerticalScale(10),
                                right: moderateVerticalScale(10),
                                zIndex: 1,
                              }}></TouchableOpacity>
                          )}
                          <Icons
                            name={'user-circle-o'}
                            size={moderateVerticalScale(28)}
                            type={'font-awesome'}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: moderateVerticalScale(50),
                              width: moderateVerticalScale(50),
                              borderRadius: 100,
                            }}
                            containerStyle={{
                              borderRadius: 100,
                              alignSelf: 'center',
                            }}
                            pressableProps={{
                              android_ripple: {
                                borderless: true,
                                color: '#f5f5f533',
                              },
                            }}
                            color={colors.text_inverse}
                            onPress={() => {
                              setIsModal(true);
                              console.log(
                                'setparam',
                                navigation.navigate('Orders', {
                                  isModal: true,
                                }),
                              );
                            }}
                          />
                        </>
                      }
                    />
                    <MenuOptions
                      customStyles={{optionsContainer: styles.modalInner}}>
                      <MenuOption
                        style={styles.buttonContainer}
                        onSelect={() => {
                          navigation.navigate('Orders', {isModal: false});
                          goToNavigation('Profile');
                        }}
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
                              textStyle={{color: colors.text_normal + '80'}}
                            />
                          </>
                        }
                      />
                      <MenuOption
                        style={styles.buttonContainer}
                        onSelect={() => {
                          navigation.navigate('Orders', {isModal: false});
                          goToNavigation('MoneyReturn');
                        }}
                        children={
                          <>
                            {order?.length > 0 && (
                              <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                  setIsModal(true);
                                  console.log(
                                    'setparam',
                                    navigation.navigate('Orders', {
                                      isModal: true,
                                    }),
                                  );
                                }}
                                style={{
                                  backgroundColor: 'red',
                                  width: moderateVerticalScale(8),
                                  height: moderateVerticalScale(8),
                                  borderRadius: 40,
                                  position: 'absolute',
                                  top: moderateVerticalScale(9),
                                  left: moderateVerticalScale(10),
                                  zIndex: 1,
                                }}></TouchableOpacity>
                            )}
                            <MCI
                              name="account-cash"
                              size={moderateVerticalScale(20)}
                              color={colors.primary}
                              style={styles.btnIcon}
                            />
                            <MyText
                              label={'Return Amount'}
                              size={'title'}
                              textStyle={{color: colors.text_normal + '80'}}
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
                              textStyle={{color: colors.text_normal + '80'}}
                            />
                          </>
                        }
                      />
                    </MenuOptions>
                  </Menu>
                }
              />
              <BlurBackground show={isModal} />
            </>
          ),
        }}
      />
      <Stack.Screen name="Purchasing_List" component={PurchasingList} />
      <Stack.Screen name="MoneyReturn" component={MoneyReturn} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  modalInner: {
    width: moderateScale(150),
    backgroundColor: colors.background,
    borderRadius: moderateVerticalScale(5),
    zIndex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  btnIcon: {
    paddingRight: moderateScale(5),
    top: 1,
  },
});

export default RiderNavigator;
