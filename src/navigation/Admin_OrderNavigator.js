import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderList} from '../screens';

const Stack = createStackNavigator();
function OrderNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OrderList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderList" component={OrderList} />
    </Stack.Navigator>
  );
}

export default OrderNavigator;
