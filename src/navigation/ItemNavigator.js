import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddForm, ItemList} from '../screens';

const Stack = createStackNavigator();
function ItemNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ItemList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ItemList" component={ItemList} />
      <Stack.Screen name="Add_Form" component={AddForm} />
    </Stack.Navigator>
  );
}

export default ItemNavigator;
