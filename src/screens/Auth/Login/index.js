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

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedRole, setselectedRole] = useState('ADMIN');

  const emailRef = useRef('mraza@esparkconsultants.com');
  const passRef = useRef('123456789');

  const [LoginUser, {loading: userLoader}] = useLazyQuery(LOGIN_USER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  console.log('emailRef', emailRef?.current, passRef.current);
  const handleNavigate = async () => {
    try {
      const userData = await LoginUser({
        variables: {
          email: emailRef.current,
          password: passRef.current,
          fcmToken: 'send fcm token here',
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
            message: 'This email is not valid for selected role!',
            type: 'danger',
            icon: 'auto',
            duration: 500,
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
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
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
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={text => {
            emailRef.current = text;
          }}
          placeholder="Email"
          style={styles.inputStyle}
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={text => {
            passRef.current = text;
          }}
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleNavigate()}>
          {userLoader ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <Text
              style={{
                fontSize: height * 0.03,
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
      <View
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default Login;
