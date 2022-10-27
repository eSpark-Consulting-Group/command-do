import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CollectedOrders from './CollectedOrders';
import CurrentOrders from './CurrentOrders';
import PurchasingList from '../PurchasingList';

const Tab = createMaterialTopTabNavigator();

export default function Orders() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Current Orders" component={CurrentOrders} />
      <Tab.Screen name="Collected Orders" component={CollectedOrders} />
    </Tab.Navigator>
  );
}
