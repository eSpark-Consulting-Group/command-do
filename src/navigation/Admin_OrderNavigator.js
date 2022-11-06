import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {OrderList} from '../screens';
import FilterScreen from '../screens/Admin/ordersList/Filters';
import OrderDetails from '../screens/Admin/ordersList/OrderDetails';
import UserList from '../screens/Admin/ordersList/UserList';

const Stack = createStackNavigator();
function OrderNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OrderList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group
        screenOptions={{animationEnabled: true, presentation: 'modal'}}>
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="Filters" component={FilterScreen} />
        <Stack.Screen name="UserList" component={UserList} />
      </Stack.Group>
      <Stack.Screen name="Order_Details" component={OrderDetails} />
    </Stack.Navigator>
  );
}

export default OrderNavigator;
