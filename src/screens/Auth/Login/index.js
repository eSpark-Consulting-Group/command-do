// BooksScreen.js
import React, {useState, useRef, createRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyQuery} from '@apollo/client';
import {CheckBox, Icon} from '@rneui/themed';

import {Fonts} from '../../../utils/fonts';
import {Logo} from '../../../assets/images';
import MyText from '../../../components/Text';
import {LOGIN_USER} from '../../../graphQL/query/user.query';
import {getUserDetails} from '../../../features/userInfo/userInfoSlice';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {sendFCMToken} from '../../../utils/helperFunctions';
import {SCREEN_HEIGHT} from '../../../constants';
import {moderateVerticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedRole, setselectedRole] = useState('ADMIN');
  const [showPass, setShowPass] = useState(false);

  const emailRef = useRef('mraza@esparkconsultants.com');
  const passRef = useRef('123456789');

  const [LoginUser, {loading: userLoader}] = useLazyQuery(LOGIN_USER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  console.log('emailRef', emailRef?.current, passRef.current);
  const handleNavigate = async () => {
    try {
      const tokenFCM = await sendFCMToken();
      const userData = await LoginUser({
        variables: {
          email: emailRef.current,
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
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={Logo}
          style={{
            height: height * 0.1,
            width: height * 0.243,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 80,
        }}>
        <View style={styles.inputStyle}>
          <TextInput
            onChangeText={text => {
              emailRef.current = text;
            }}
            placeholder="Email"
            style={{
              width: '100%',
              paddingHorizontal: 10,
            }}
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            onChangeText={text => {
              passRef.current = text;
            }}
            placeholder="Password"
            secureTextEntry={!showPass}
            placeholderTextColor="gray"
            style={{
              width: '85%',
              paddingHorizontal: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => setShowPass(!showPass)}
            style={{paddingHorizontal: SCREEN_HEIGHT * 0.015}}>
            <Icon name={showPass ? 'visibility' : 'visibility-off'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleNavigate()}>
          {userLoader ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <Text
              style={{
                fontSize: moderateVerticalScale(20),
                color: 'white',
                fontFamily: Fonts.Roboto_Black,
              }}>
              Login
            </Text>
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
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="#11a79c"
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
            textStyle={{fontSize: 12, marginLeft: 0, marginRight: 5}}
            containerStyle={{padding: 0, alignSelf: 'center'}}
            checked={selectedRole == 'ADMIN'}
            onPress={() => setselectedRole('ADMIN')}
          />
          <CheckBox
            containerStyle={{
              padding: 0,
              margin: 0,
              alignSelf: 'center',
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="#11a79c"
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
            textStyle={{
              fontSize: 12,
              marginLeft: 0,
              marginRight: 5,
            }}
            title="User"
            checked={selectedRole == 'USER'}
            onPress={() => setselectedRole('USER')}
          />
          <CheckBox
            title="Rider"
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="#11a79c"
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
            textStyle={{fontSize: 12, marginLeft: 0, marginRight: 5}}
            containerStyle={{padding: 0, alignSelf: 'center'}}
            checked={selectedRole == 'RIDER'}
            onPress={() => setselectedRole('RIDER')}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
