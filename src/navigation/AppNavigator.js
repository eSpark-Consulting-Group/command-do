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
  Orders,
  OrderHistory,
  SearchItem,
  ChangePassword,
} from '../screens';
import AdminNavigator from './AdminNavigator';
import RiderNavigator from './RiderNavigator';
import {useSelector} from 'react-redux';
import {ROLES} from '../constants';
import {MyHeader} from '../components';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createStackNavigator();
function MainStackNavigator() {
  const navigationRef = React.useRef();
  const userData = useSelector(store => store?.userInfo?.userData);
  const initialRouteName = ROLES[userData?.selected] || 'Login';
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        {!userData ? (
          <Stack.Screen name="Login" component={Login} />
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
