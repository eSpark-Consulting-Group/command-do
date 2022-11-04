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
import {View} from 'react-native';
import {MyText} from '../components';

const Stack = createStackNavigator();
// 11a79c
function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Item" component={Items} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Home_Rider" component={RiderNavigator} />
        <Stack.Screen name="Home_Admin" component={AdminNavigator} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
