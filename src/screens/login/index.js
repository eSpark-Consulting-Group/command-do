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
import styles from './styles';
import {useLazyQuery} from '@apollo/client';
import {LOGIN_USER} from '../../graphQl/query/user.query';
import {getUserDetails} from '../../features/userInfo/userInfoSlice';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [LoginUser, {data, error, loading}] = useLazyQuery(LOGIN_USER);
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

  const handleNavigate = async (admin, user, rider) => {
    try {
      const userData = await LoginUser({
        variables: {
          email: 'wirad@esparkconsultants.com',
          password: 'D^nx)z(nR99g8',
          fcmToken: 'send fcm token here',
        },
      });

      dispatch(getUserDetails(userData.data.loginUser));
      console.log('user login successfully', userData.data);
      if (admin) {
        navigation.navigate('Home_Admin');
      } else if (user) {
        navigation.navigate('Home', {name: 'rohail'});
      } else if (rider) {
        navigation.navigate('Home_Rider');
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
          placeholder="Email"
          style={styles.inputStyle}
          placeholderTextColor="gray"
          value="rohail@esparkconsultants.com"
        />
        <TextInput
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
          placeholderTextColor="gray"
          value="assdlkjaslkdjsd"
        />
        <TouchableOpacity
          style={styles.loginButton}
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
