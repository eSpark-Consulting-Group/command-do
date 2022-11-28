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
import {logout} from '../features/userInfo/userInfoSlice';
import {useDispatch, useSelector} from 'react-redux';
import {moderateVerticalScale} from 'react-native-size-matters';

const Stack = createStackNavigator();

function RiderNavigator({navigation}) {
  const [isModal, setIsModal] = useState(false);
  const finishedStatus = useSelector(
    store => store?.riderOrder.collectionFinished,
  );

  const dispatch = useDispatch();
  console.log('Finished Status', finishedStatus);

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

  const logoutHandler = () => {
    dispatch(logout());
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
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Profile'}
                        size={'title'}
                        textStyle={{color: colors.text_normal + '80'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.buttonContainer,
                        {borderBottomWidth: SCREEN_HEIGHT * 0},
                      ]}
                      onPress={() => logoutHandler()}>
                      <Ionicons
                        name="ios-exit"
                        size={moderateVerticalScale(20)}
                        color={colors.primary}
                        style={styles.btnIcon}
                      />
                      <MyText
                        label={'Log out'}
                        size={'title'}
                        textStyle={{color: colors.text_normal + '80'}}
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
    width: SCREEN_WIDTH * 0.3,
    position: 'absolute',
    backgroundColor: colors.text_inverse,
    borderRadius: SCREEN_HEIGHT * 0.005,
    zIndex: 1,
    top: SCREEN_HEIGHT * 0.03,
    right: SCREEN_HEIGHT * 0.03,
    elevation: SCREEN_HEIGHT * 0.003,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SCREEN_HEIGHT * 0.01,
    borderBottomWidth: SCREEN_HEIGHT * 0.0005,
    borderBottomColor: '#00000050',
  },
  btnIcon: {
    paddingRight: SCREEN_HEIGHT * 0.01,
    top: 1,
  },
});

export default RiderNavigator;
