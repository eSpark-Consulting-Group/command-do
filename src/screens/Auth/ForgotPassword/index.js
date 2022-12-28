import React, {useState, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {moderateVerticalScale} from 'react-native-size-matters';

import {MyHeader, MyText} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';
import {FORGOT_PASS} from '../../../graphQL/mutation/user.mutation';

export default function ForgotPassword({navigation}) {
  const [forgotPassword, {loading}] = useMutation(FORGOT_PASS);
  const [email, setEmail] = useState('');

  function ValidateEmail(mail) {
    if (mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        showMessage({
          message: 'Please enter a valid email address!',
          type: 'danger',
          icon: 'auto',
        });
        return false;
      }
    } else {
      showMessage({
        message: 'Email Address is required',
        type: 'danger',
        icon: 'auto',
      });
      return false;
    }
  }

  const handleNavigate = async () => {
    navigation.navigate('OTPVerification', {email: email.toLowerCase()});
    // if (ValidateEmail(email.toLowerCase())) {
    //   try {
    //     const userData = await forgotPassword({
    //       variables: {
    //         email: email.toLowerCase(),
    //       },
    //     });
    //     if (userData.data?.forgotPassword?.status) {
    //       setEmail('');
    //       showMessage({
    //         message: userData.data?.forgotPassword?.message,
    //         type: 'success',
    //         icon: 'auto',
    //       });
    //       navigation.navigate('OTPVerification', {email: email.toLowerCase()});
    //     } else {
    //       showMessage({
    //         message: userData.data?.forgotPassword?.message,
    //         type: 'danger',
    //         icon: 'auto',
    //       });
    //     }
    //   } catch (error) {
    //     console.log('email error', error);
    //   }
    // }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MyHeader
        onPressLeft={() => navigation?.navigate('Login')}
        leftIcon="arrow-back"
        title="Forgot Password"
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
          <MyText label={'Enter Email Address'} />
          <View style={styles.inputStyle}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="example@email.com"
              style={{
                width: '100%',
                paddingHorizontal: SCREEN_HEIGHT * 0.015,
                padding: 0,
              }}
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleNavigate}>
          {loading ? (
            <ActivityIndicator size={30} color={colors.text_inverse} />
          ) : (
            <MyText
              label={'Send OTP'}
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
    elevation: 2,
  },
});
