import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CollectedOrders from './CollectedOrders';
import CurrentOrders from './CurrentOrders';
import {colors} from '../../../theme';
import {MyText} from '../../../components';
import {SCREEN_WIDTH} from '../../../constants';

const Tab = createMaterialTopTabNavigator();

export default function Rider() {
  const now = new Date().toTimeString();
  console.log('now', now);
  const state =
    now >= '12:30:00 GMT+0500 (PKT)' && now <= '16:30:00 GMT+0500 (PKT)';
  // const state = true;

  return state ? <Orders /> : <Empty />;
}

function Empty() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyText
        numberOfLines={3}
        label={'Orders Not Ready Yet!'}
        size={'subHeading'}
        textStyle={{maxWidth: SCREEN_WIDTH / 1.5, textAlign: 'center'}}
      />
    </View>
  );
}

function Orders() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
        tabBarLabelStyle: {fontFamily: 'Poppins-Bold'},
        tabBarPressColor: colors.primary + '33',
      }}>
      <Tab.Screen name="Current Orders" component={CurrentOrders} />
      <Tab.Screen name="Collected Orders" component={CollectedOrders} />
    </Tab.Navigator>
  );
}
