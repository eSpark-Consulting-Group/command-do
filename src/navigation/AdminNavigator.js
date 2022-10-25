import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ItemList, Orders, Users} from '../screens';
import Ion from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Items"
        component={ItemList}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'fast-food' : 'fast-food-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'receipt' : 'receipt-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Ion
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
