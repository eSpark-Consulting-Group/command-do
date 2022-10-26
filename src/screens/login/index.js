// BooksScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {CheckBox, Icon} from '@rneui/themed';

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Fonts} from '../../utils/fonts';
import {Logo} from '../../assets/images';
import MyText from '../../components/Text';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const count = useSelector(store => store);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const handleCheck = value => {
    if (value === '1') {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
    } else if (value === '2') {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
    } else if (value === '3') {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
    }
  };

  const handleNavigate = (admin, user, rider) => {
    if (admin) {
      navigation.navigate('Home_Admin');
    } else if (user) {
      navigation.navigate('Home', {name: 'rohail'});
    } else if (rider) {
      navigation.navigate('Orders');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" hidden />
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
          placeholder="Email"
          style={{
            // backgroundColor: 'white',
            width: width * 0.8,
            height: height * 0.07,
            borderRadius: height * 0.005,
            paddingLeft: height * 0.015,
            borderWidth: height * 0.001,
            marginVertical: height * 0.01,
            fontFamily: Fonts.Roboto_Medium,
            color: 'black',
          }}
          placeholderTextColor="gray"
          value="rohail@esparkconsultants.com"
        />
        <TextInput
          placeholder="Password"
          style={{
            // backgroundColor: 'white',
            height: height * 0.07,
            width: width * 0.8,
            borderRadius: height * 0.005,
            paddingLeft: height * 0.015,
            borderWidth: height * 0.001,
            marginVertical: height * 0.01,
            fontFamily: Fonts.Roboto_Medium,
            color: 'black',
          }}
          secureTextEntry
          placeholderTextColor="gray"
          value="assdlkjaslkdjsd"
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
          onPress={() => handleNavigate(check1, check2, check3)}>
          <Text
            style={{
              fontSize: height * 0.03,
              color: 'white',
              fontFamily: Fonts.Roboto_Black,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            // backgroundColor: 'teal',
            flexDirection: 'row',
            width: width * 0.8,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <MyText label="Select Role:" style={{textAlignVertical: 'center'}} />
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
            checked={check1}
            onPress={() => handleCheck('1')}
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
            checked={check2}
            onPress={() => handleCheck('2')}
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
            checked={check3}
            onPress={() => handleCheck('3')}
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
