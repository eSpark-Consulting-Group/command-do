import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddFormItem, ItemList, SearchScreen} from '../screens';

const Stack = createStackNavigator();
function ItemNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ItemList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group
        screenOptions={{animationEnabled: true, presentation: 'modal'}}>
        <Stack.Screen name="ItemList" component={ItemList} />
      </Stack.Group>
      <Stack.Screen name="Add_Form" component={AddFormItem} />
    </Stack.Navigator>
  );
}

export default ItemNavigator;
