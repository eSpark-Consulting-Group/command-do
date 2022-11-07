import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch} from 'react-redux';
import {useLazyQuery} from '@apollo/client';

import CollectedOrders from './CollectedOrders';
import CurrentOrders from './CurrentOrders';
import {ALL_ORDERS} from '../../../graphQl/query/orders.query';
import {getOrders} from '../../../features/riderOrders/riderOrderSlice';
import {colors} from '../../../theme';

const Tab = createMaterialTopTabNavigator();

export default function Orders() {
  const [GetAllOrders] = useLazyQuery(ALL_ORDERS);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await GetAllOrders({
        variables: {
          createdAt:
            'Tue Nov 01 2022 18:55:20 GMT+0500 (Pakistan Standard Time)',
        },
      });
      dispatch(getOrders(orders.data.getAllOrders.data));
    };
    fetchOrders()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
