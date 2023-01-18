import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { moderateVerticalScale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';
import CountDown from 'react-native-countdown-component';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { MyHeader, MyText } from '../../../components';
import { SCREEN_WIDTH } from '../../../constants';
import { colors } from '../../../theme';
import {
  OTP_VERIFY,
  RESEND_OTP,
} from '../../../graphQL/mutation/user.mutation';

export default function OTPVerification({ navigation, route }) {
  const [VerifyOtp, { loading }] = useMutation(OTP_VERIFY);
  const [resendOtp] = useMutation(RESEND_OTP);
  const [code, setCode] = useState('');
  const [expTime, setExpTime] = useState(false);
  const [time, setTime] = useState(60);
  const ref = useBlurOnFulfill({ value: code, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const resendOTP = async () => {
    try {
      const userData = await resendOtp({
        variables: {
          email: route?.params?.email,
        },
      });
      if (userData.data?.resendOtp?.status) {
        showMessage({
          message: 'Verfication code has been sent to the email',
          type: 'success',
          icon: 'auto',
        });
        setTime(prevState => {
          if (prevState == 60) {
            setTime(59);
          } else {
            setTime(60);
          }
        });
        setExpTime(false);
      } else {
        navigation.goBack();
        showMessage({
          message: userData.data?.resendOtp?.message,
          type: 'danger',
          icon: 'auto',
        });
      }
    } catch (error) {
      console.log('email error', error);
    }
  };

  const handleVerificationCode = async () => {
    try {
      const userData = await VerifyOtp({
        variables: {
          token: code,
          email: route?.params?.email,
        },
      });
      console.log('userData.data?.verifyOtp?', userData.data?.verifyOtp);
      if (userData.data?.verifyOtp?.status) {
        navigation.navigate('NewPassword', { email: route?.params?.email });
        return true;
      } else {
        showMessage({
          message: userData.data?.verifyOtp?.message,
          type: 'danger',
          icon: 'auto',
        });
      }
    } catch (error) {
      console.log('email error', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <MyHeader
        onPressLeft={() => navigation?.goBack()}
        leftIcon="arrow-back"
        title="Verification"
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
        <View
          style={{
            marginVertical: moderateVerticalScale(5),
            alignItems: 'center',
          }}>
          <MyText label={'Enter Verification Code'} />
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={text => {
              setCode(text);
              console.log('TEXT', text);
            }}
            cellCount={4}
            rootStyle={{
              marginVertical: moderateVerticalScale(15),
              width: SCREEN_WIDTH * 0.8,
              justifyContent: 'space-evenly',
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                <MyText
                  label={symbol || (isFocused ? <Cursor /> : null)}
                  textStyle={{
                    color: colors.primary,
                    fontFamily: 'Poppins-SemiBold',
                  }}
                  onLayout={getCellOnLayoutHandler(index)}
                />
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: moderateVerticalScale(10),
          }}>
          <MyText
            label={"If you didn't get a code! "}
            textStyle={{
              fontFamily: 'Poppins-Medium',
            }}
          />
          <TouchableOpacity disabled={!expTime} onPress={resendOTP}>
            <MyText
              label={'Resend'}
              textStyle={{
                color: expTime ? colors.primary : '#ccc',
                fontFamily: 'Poppins-SemiBold',
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            ...styles.loginButton,
            backgroundColor: code.length < 4 ? '#ccc' : colors.primary,
          }}
          disabled={code.length < 4}
          onPress={handleVerificationCode}>
          {loading ? (
            <ActivityIndicator size={30} color={colors.text_inverse} />
          ) : (
            <MyText
              label={'Verify'}
              size={'title'}
              textStyle={{ color: colors.text_inverse }}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateVerticalScale(10),
          }}>
          <MyText
            label={'Verfication code will expire in '}
            textStyle={{
              fontFamily: 'Poppins-Medium',
              justifyContent: 'center',
            }}
          />
          <CountDown
            until={time}
            onFinish={() => {
              setExpTime(true);
            }}
            size={moderateVerticalScale(10)}
            showSeparator
            separatorStyle={{ color: colors.text_normal, fontSize: 20 }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: null, s: null }}
            digitStyle={{ marginHorizontal: moderateVerticalScale(1) }}
            digitTxtStyle={{ fontSize: 20, color: colors.primary }}
          />
        </View>
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
  cell: {
    width: moderateVerticalScale(50),
    height: moderateVerticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '60',
    borderRadius: 35,
  },
  focusCell: {
    borderColor: colors.primary,
  },
});
