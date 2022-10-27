import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CollectedOrders, ItemList, Orders, Users} from '../screens';
import Ion from 'react-native-vector-icons/Ionicons';
import {OrderCard} from '../components';

const Tab = createMaterialTopTabNavigator();

export default function RiderNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Current Orders" component={Orders} />
      <Tab.Screen name="Collected Orders" component={CollectedOrders} />
    </Tab.Navigator>
  );
}
