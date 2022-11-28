import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {useSelector} from 'react-redux';

import {MyHeader, MyText} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';
import {CHANGE_PASS} from '../../../graphQL/query/user.query';
import {showMessage} from 'react-native-flash-message';
import {Icon} from '@rneui/themed';
import {moderateVerticalScale} from 'react-native-size-matters';

export default function ChangePassword({navigation}) {
  const userId = useSelector(store => store.userInfo?.userData.id);
  const [ChangePassword, {loading}] = useMutation(CHANGE_PASS);
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [currShow, setCurrShow] = useState(false);
  const [newShow, setNewShow] = useState(false);

  const handleChangePass = async () => {
    const userData = await ChangePassword({
      variables: {
        changePasswordId: userId,
        currentPassword: currPass,
        newPassword: newPass,
      },
    });
    const status = userData.data?.changePassword?.status;
    showMessage({
      message: userData.data?.changePassword?.message,
      type: status ? 'success' : 'danger',
      icon: 'auto',
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MyHeader
        onPressLeft={() => navigation?.navigate('Home')}
        leftIcon="arrow-back"
        title="Change Password"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
          fontSize: moderateVerticalScale(28),
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginBottom: SCREEN_HEIGHT * 0.05,
        }}>
        <View style={{marginVertical: 5}}>
          <MyText label={'Enter Your Current Password'} />
          <View style={styles.inputStyle}>
            <TextInput
              onChangeText={text => {
                setCurrPass(text);
              }}
              secureTextEntry={!currShow}
              placeholder="Current Password"
              style={{
                width: '85%',
                paddingHorizontal: SCREEN_HEIGHT * 0.015,
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
        <View style={{marginVertical: 5}}>
          <MyText label={'Enter Your New Password'} />
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
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleChangePass()}>
          {loading ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <MyText
              label={'Change Password'}
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
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.005,
    borderWidth: SCREEN_HEIGHT * 0.001,
    marginVertical: SCREEN_HEIGHT * 0.01,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.005,
    paddingLeft: SCREEN_HEIGHT * 0.015,
    marginVertical: SCREEN_HEIGHT * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: SCREEN_HEIGHT * 0.003,
  },
});
