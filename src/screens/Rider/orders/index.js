import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CollectedOrders from './CollectedOrders';
import CurrentOrders from './CurrentOrders';
import { colors } from '../../../theme';
import { BackButtonHandler, BlurBackground, MyText } from '../../../components';
import { SCREEN_WIDTH } from '../../../constants';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function Rider({ route }) {
  const isFocused = useIsFocused();
  const now = new Date().toTimeString();
  const state =
    now >= '12:30:00 GMT+0500 (PKT)' && now <= '16:30:00 GMT+0500 (PKT)';
  return (
    <>
      {state ? (
        <Orders />
      ) : (
        <>
          {isFocused && <BackButtonHandler />}
          <Empty />
        </>
      )}
      <BlurBackground show={route?.params?.isModal} />
    </>
  );
}

function Empty() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MyText
        numberOfLines={3}
        label={'Orders Not Ready Yet!'}
        size={'subHeading'}
        textStyle={{ maxWidth: SCREEN_WIDTH / 1.5, textAlign: 'center' }}
      />
    </View>
  );
}

function Orders() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarLabelStyle: { fontFamily: 'Poppins-Bold' },
        tabBarPressColor: colors.primary + '33',
      }}>
      <Tab.Screen name="Current Orders" component={CurrentOrders} />
      <Tab.Screen name="Collected Orders" component={CollectedOrders} />
    </Tab.Navigator>
  );
}
