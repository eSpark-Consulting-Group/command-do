import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CollectedOrders from './CollectedOrders';
import CurrentOrders from './CurrentOrders';
import {colors} from '../../../theme';

const Tab = createMaterialTopTabNavigator();

export default function Orders() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
        tabBarLabelStyle: {fontFamily: 'Poppins-Bold'},
      }}>
      <Tab.Screen name="Current Orders" component={CurrentOrders} />
      <Tab.Screen name="Collected Orders" component={CollectedOrders} />
    </Tab.Navigator>
  );
}
