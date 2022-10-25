// BooksScreen.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const count = useSelector(store => store);

  // console.log('count--<>', count);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <View
        style={{
          // backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: height * 0.06,
            fontFamily: Fonts.Roboto_Black,
            color: 'gray',
          }}>
          Logo
        </Text>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Email"
          style={{
            // backgroundColor: 'white',
            width: width * 0.8,
            borderRadius: height * 0.005,
            paddingLeft: height * 0.015,
            borderWidth: height * 0.001,
            marginVertical: height * 0.01,
            fontFamily: Fonts.Roboto_Medium,
            color: 'black',
          }}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Password"
          style={{
            // backgroundColor: 'white',
            width: width * 0.8,
            borderRadius: height * 0.005,
            paddingLeft: height * 0.015,
            borderWidth: height * 0.001,
            marginVertical: height * 0.01,
            fontFamily: Fonts.Roboto_Medium,
            color: 'black',
          }}
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#11a79c',
            width: width * 0.8,
            height: height * 0.07,
            borderRadius: height * 0.005,
            paddingLeft: height * 0.015,
            marginVertical: height * 0.01,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: height * 0.003,
          }}
          onPress={() => navigation.navigate('Home')}>
          <Text
            style={{
              fontSize: height * 0.03,
              color: 'white',
              fontFamily: Fonts.Roboto_Black,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
        }}></View>
    </View>
  );
};

export default Login;
