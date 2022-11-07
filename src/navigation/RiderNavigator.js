import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MoneyReturn, Orders, PurchasingList} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomizeModal, MyHeader, MyText} from '../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants';
import {colors} from '../theme';

const Stack = createStackNavigator();
// 11a79c
function RiderNavigator({navigation}) {
  const [isModal, setIsModal] = useState(false);

  const isModalVisible = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setIsModal(!isModal);
  };

  const goToNavigation = navigate => {
    navigation.navigate(navigate);
    setIsModal(!isModal);
  };

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
            <>
              <MyHeader
                title="Today Orders"
                icon="user-circle-o"
                rightIconType="font-awesome"
                onPressRight={() => setIsModal(true)}
                titleStyle={{fontFamily: 'Poppins-Bold'}}
              />
              <CustomizeModal
                isVisible={isModal}
                setBackDrop={isModalVisible}
                navigation={navigation}
                renderData={
                  <View style={styles.modalInner}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => goToNavigation('Profile')}>
                      <Ionicons
                        name="person"
                        size={SCREEN_HEIGHT * 0.025}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Profile'}
                        title
                        style={{color: colors.text_normal}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.buttonContainer,
                        {borderBottomWidth: SCREEN_HEIGHT * 0},
                      ]}
                      onPress={() => goToNavigation('Login')}>
                      <Ionicons
                        name="ios-exit"
                        size={SCREEN_HEIGHT * 0.025}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Log out'}
                        title
                        style={{color: colors.text_normal}}
                      />
                    </TouchableOpacity>
                  </View>
                }
              />
            </>
          ),
        }}
      />
      <Stack.Screen name="Purchasing_List" component={PurchasingList} />
      <Stack.Screen name="MoneyReturn" component={MoneyReturn} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  modalInner: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: SCREEN_HEIGHT * 0.005,
    zIndex: 1,
    top: SCREEN_HEIGHT * 0.03,
    right: SCREEN_HEIGHT * 0.03,
    elevation: SCREEN_HEIGHT * 0.003,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SCREEN_HEIGHT * 0.01,
    borderBottomWidth: SCREEN_HEIGHT * 0.0005,
    borderBottomColor: '#00000050',
  },
  btnIcon: {
    paddingRight: SCREEN_HEIGHT * 0.01,
  },
});

export default RiderNavigator;
