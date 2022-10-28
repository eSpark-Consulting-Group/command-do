import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddFormUser, Users} from '../screens';

const Stack = createStackNavigator();
function UserNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="User" component={Users} />
      <Stack.Screen name="Add_Form_User" component={AddFormUser} />
    </Stack.Navigator>
  );
}

export default UserNavigator;
