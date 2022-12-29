import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import {
  Home,
  Login,
  Items,
  Cart,
  OrderConfirm,
  Profile,
  OrderHistory,
  SearchItem,
  ChangePassword,
  ForgotPassword,
  OTPVerification,
  NewPassword,
} from '../screens';
import AdminNavigator from './AdminNavigator';
import RiderNavigator from './RiderNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {ROLES} from '../constants';
import {MyHeader} from '../components';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_DETAIL } from '../graphQL/query/user.query';
import { getUserDetails } from '../features/userInfo/userInfoSlice';

const Stack = createStackNavigator();

function MainStackNavigator() {
  const navigationRef = React.useRef();
  const userData = useSelector(store => store?.userInfo?.userData);
  const initialRouteName = ROLES[userData?.selected] || 'Login';

  const [LoadUserDetail, {loading: userLoader}] = useLazyQuery(
    GET_USER_DETAIL,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  const dispatch = useDispatch()
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    LoadUserDetail({variables: {
      "getUserByIdId": userData?.id
  }})
  .then((res) => {
    const obj = {...res?.data?.getUserById?.data}
    obj.selected = userData?.selected ?? 'USER';
    console.log("res res res res", Boolean(res?.data?.getUserById?.data));
    if(Boolean(res?.data?.getUserById?.data)) {
      dispatch(getUserDetails(obj));
    }
  })
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        {!userData ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
          </>
        ) : (
          <>
            {userData?.selected == 'USER' && (
              <Stack.Screen name="Home" component={Home} />
            )}
            {userData?.selected == 'RIDER' && (
              <Stack.Screen name="Home_Rider" component={RiderNavigator} />
            )}
            {userData?.selected == 'ADMIN' && (
              <Stack.Screen name="Home_Admin" component={AdminNavigator} />
            )}
            <Stack.Screen name="Item" component={Items} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="OrderHistory"
              component={OrderHistory}
              options={{
                headerShown: true,
                header: () => (
                  <MyHeader
                    onPressLeft={() => navigationRef.current.navigate('Home')}
                    leftIcon="arrow-back"
                    title="Order History"
                    titleStyle={{
                      fontFamily: 'Poppins-Bold',
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen name="SearchItem" component={SearchItem} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
