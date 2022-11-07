import * as React from 'react';
import {View} from 'react-native';
import {Icon} from '@rneui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MoneyReturn, Orders, PurchasingList} from '../screens';

import {MyText} from '../components';
import {SCREEN_WIDTH} from '../constants';
import {colors} from '../theme';

const Stack = createStackNavigator();
// 11a79c
function RiderNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: true,
          header: () => (
            <View
              style={{
                width: SCREEN_WIDTH,
                padding: 5,
                paddingHorizontal: 15,
                elevation: 5,
                borderRadius: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.primary,
              }}>
              <MyText
                label={'Today Orders'}
                size={'subHeading'}
                textStyle={{
                  fontFamily: 'Poppins-Bold',
                  textAlignVertical: 'center',
                  color: colors.text_inverse,
                }}
              />
              <Icon
                name="search"
                size={34}
                color={colors.text_inverse}
                containerStyle={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="Purchasing_List" component={PurchasingList} />
      <Stack.Screen name="MoneyReturn" component={MoneyReturn} />
    </Stack.Navigator>
  );
}

export default RiderNavigator;
