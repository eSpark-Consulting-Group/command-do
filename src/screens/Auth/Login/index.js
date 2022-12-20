// BooksScreen.js
import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useLazyQuery} from '@apollo/client';
import {CheckBox, Icon} from '@rneui/themed';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {Logo} from '../../../assets/images';
import MyText from '../../../components/Text';
import {LOGIN_USER} from '../../../graphQL/query/user.query';
import {getUserDetails} from '../../../features/userInfo/userInfoSlice';
import styles from './styles';
import {sendFCMToken} from '../../../utils/helperFunctions';
import {colors} from '../../../theme';
import {BackButtonHandler} from '../../../components';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [selectedRole, setselectedRole] = useState('ADMIN');
  const [showPass, setShowPass] = useState(false);

  // const emailRef = useRef('mraza@esparkconsultants.com');
  // const passRef = useRef('123456789');
  const emailRef = useRef('');
  const passRef = useRef('');

  const [LoginUser, {loading: userLoader}] = useLazyQuery(LOGIN_USER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  console.log('emailRef', emailRef?.current, passRef.current);
  function ValidateEmail(mail, pass) {
    if (mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        if (!pass) {
          showMessage({
            message: 'Password is required',
            type: 'danger',
            icon: 'auto',
          });
          return false;
        } else {
          return true;
        }
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
        message: 'Email is required',
        type: 'danger',
        icon: 'auto',
      });
      return false;
    }
  }

  const handleNavigate = async () => {
    if (ValidateEmail(emailRef.current.toLowerCase(), passRef.current)) {
      try {
        const tokenFCM = await sendFCMToken();
        const userData = await LoginUser({
          variables: {
            email: emailRef.current.toLowerCase(),
            password: passRef.current,
            fcmToken: tokenFCM,
          },
        });
        const obj = {...userData.data.loginUser.data};
        if (userData.data?.loginUser?.status) {
          if (userData.data?.loginUser?.data?.role?.includes(selectedRole)) {
            obj.selected = selectedRole;
            dispatch(getUserDetails(obj));
            showMessage({
              message: userData.data?.loginUser?.message,
              type: 'success',
              icon: 'auto',
              duration: 500,
            });
          } else {
            showMessage({
              message: 'This account is not valid for selected role!',
              type: 'danger',
              icon: 'auto',
            });
          }
        } else {
          showMessage({
            message: userData.data?.loginUser?.message,
            type: 'danger',
            icon: 'auto',
          });
        }
      } catch (error) {
        console.log('login error', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && <BackButtonHandler />}
      <View style={styles.mainLogoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainerStyle}>
          <TextInput
            onChangeText={text => {
              emailRef.current = text;
            }}
            placeholder="Email"
            style={styles.inputStyle}
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            onChangeText={text => {
              passRef.current = text;
            }}
            placeholder="Password"
            secureTextEntry={!showPass}
            placeholderTextColor="gray"
            style={styles.inputStyle}
          />
          <TouchableOpacity
            onPress={() => setShowPass(!showPass)}
            style={styles.showHidePassBtn}>
            <Icon
              name={showPass ? 'visibility' : 'visibility-off'}
              size={moderateVerticalScale(20)}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleNavigate()}>
          {userLoader ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <MyText label={'Login'} textStyle={styles.loginButtonText} />
          )}
        </TouchableOpacity>
        <View style={styles.radioButtonContainer}>
          <MyText
            label="Select Role:"
            textStyle={{textAlignVertical: 'center'}}
            size="title"
          />
          <CheckBox
            title="Admin"
            textStyle={styles.radioButtonText}
            containerStyle={styles.radioButtonInnerContainer}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={colors.primary}
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            checked={selectedRole == 'ADMIN'}
            onPress={() => setselectedRole('ADMIN')}
          />
          <CheckBox
            title="User"
            textStyle={styles.radioButtonText}
            containerStyle={styles.radioButtonInnerContainer}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={colors.primary}
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            checked={selectedRole == 'USER'}
            onPress={() => setselectedRole('USER')}
          />
          <CheckBox
            title="Rider"
            textStyle={styles.radioButtonText}
            containerStyle={styles.radioButtonInnerContainer}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={colors.primary}
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={20}
                iconStyle={{marginRight: 5}}
              />
            }
            checked={selectedRole == 'RIDER'}
            onPress={() => setselectedRole('RIDER')}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
