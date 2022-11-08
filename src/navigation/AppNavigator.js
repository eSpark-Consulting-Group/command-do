import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  Login,
  Items,
  Cart,
  OrderConfirm,
  Profile,
  Orders,
  OrderHistory,
} from '../screens';
import AdminNavigator from './AdminNavigator';
import RiderNavigator from './RiderNavigator';
import {useSelector} from 'react-redux';
import {ROLES} from '../constants';

const Stack = createStackNavigator();
function MainStackNavigator() {
  const userData = useSelector(store => store?.userInfo?.userData);
  const initialRouteName = ROLES[userData?.role] || 'Login';

  return (
    <NavigationContainer theme={{colors: {background: '#fff'}}}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        {!userData ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            {userData?.role == 'USER' && (
              <Stack.Screen name="Home" component={Home} />
            )}
            {userData?.role == 'RIDER' && (
              <Stack.Screen name="Home_Rider" component={RiderNavigator} />
            )}
            {userData?.role == 'ADMIN' && (
              <Stack.Screen name="Home_Admin" component={AdminNavigator} />
            )}
            <Stack.Screen name="Item" component={Items} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
