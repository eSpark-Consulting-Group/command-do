import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ion from 'react-native-vector-icons/Ionicons';

import ItemNavigator from './Admin_ItemNavigator';
import UserNavigator from './Admin_UserNavigator';
import OrderNavigator from './Admin_OrderNavigator';
import {colors} from '../theme';

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Items"
        component={ItemNavigator}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'fast-food' : 'fast-food-outline'}
              color={focused ? colors.primary : 'grey'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'receipt' : 'receipt-outline'}
              color={focused ? colors.primary : 'grey'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UserNavigator}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'person' : 'person-outline'}
              color={focused ? colors.primary : 'grey'}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
