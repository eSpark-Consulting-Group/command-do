import * as React from 'react';
import {StatusBar} from 'react-native';
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
} from '../screens';
import AdminNavigator from './AdminNavigator';

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
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Home_Admin" component={AdminNavigator} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
