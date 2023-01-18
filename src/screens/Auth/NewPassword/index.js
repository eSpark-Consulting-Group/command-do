import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {Icon} from '@rneui/themed';
import {moderateVerticalScale} from 'react-native-size-matters';

import {MyHeader, MyText} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';
import {CHANGE_PASS, RESET_PASS} from '../../../graphQL/mutation/user.mutation';

export default function NewPassword({navigation, route}) {
  // const userId = useSelector(store => store.userInfo?.userData.id);
  const [resetPassword, {loading}] = useMutation(RESET_PASS);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [currShow, setCurrShow] = useState(false);
  const [newShow, setNewShow] = useState(false);
  console.log('route', route?.params);

  const handleChangePass = async () => {
    if (newPass == confirmPass) {
      if (newPass.length < 8) {
        showMessage({
          message: 'Password must be at least 8 characters',
          type: 'danger',
          icon: 'auto',
        });
        return true;
      }
      const userData = await resetPassword({
        variables: {
          email: route?.params?.email,
          newPassword: confirmPass,
        },
      });
      showMessage({
        message: 'Your password has been changed successfully.',
        type: 'success',
        icon: 'auto',
      });
      navigation?.navigate('Login');
    } else {
      showMessage({
        message: 'Passwords did not match',
        type: 'danger',
        icon: 'auto',
      });
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MyHeader
        onPressLeft={() => navigation?.navigate('Login')}
        leftIcon="arrow-back"
        title="Reset Password"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
          fontSize: moderateVerticalScale(28),
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: moderateVerticalScale(35),
        }}>
        <View style={{marginVertical: 5}}>
          <MyText label={'Enter New Password'} />
          <View style={styles.inputStyle}>
            <TextInput
              onChangeText={text => {
                setNewPass(text);
              }}
              secureTextEntry={!newShow}
              placeholder="New Password"
              style={{
                width: '85%',
                paddingHorizontal: SCREEN_HEIGHT * 0.015,
                padding: 0,
              }}
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              onPress={() => setNewShow(!newShow)}
              style={{paddingHorizontal: SCREEN_HEIGHT * 0.015}}>
              <Icon name={newShow ? 'visibility' : 'visibility-off'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 5}}>
          <MyText label={'Confirm Password'} />
          <View style={styles.inputStyle}>
            <TextInput
              onChangeText={text => {
                setConfirmPass(text);
              }}
              secureTextEntry={!currShow}
              placeholder="Current Password"
              style={{
                width: '85%',
                paddingHorizontal: SCREEN_HEIGHT * 0.015,
                padding: 0,
              }}
              placeholderTextColor="gray"
            />
            <TouchableOpacity
              onPress={() => setCurrShow(!currShow)}
              style={{paddingHorizontal: SCREEN_HEIGHT * 0.015}}>
              <Icon name={currShow ? 'visibility' : 'visibility-off'} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          disabled={newPass.length < 1 && confirmPass.length < 1}
          style={{
            ...styles.loginButton,
            backgroundColor:
              newPass.length < 1 && confirmPass.length < 1
                ? '#ccc'
                : colors.primary,
          }}
          onPress={() => handleChangePass()}>
          {loading ? (
            <ActivityIndicator size={30} color={colors.text_inverse} />
          ) : (
            <MyText
              label={'Reset Password'}
              size={'title'}
              textStyle={{color: colors.text_inverse}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(40),
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(45),
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
});
