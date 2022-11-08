import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CheckBox} from '@rneui/themed';
import {useLazyQuery} from '@apollo/client';

import {
  BottomButton,
  MyHeader,
  MyInput,
  MySubHeader,
  MyText,
  OverlayLoader,
} from '../../../components';
import {colors} from '../../../theme';
import {SCREEN_HEIGHT} from '../../../constants';
import {GET_USER_DETAIL} from '../../../graphQL/query/user.query';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    mode,
    userInfo: {id},
  } = route?.params;

  const [LoadUserDetail, {loading: userLoader}] = useLazyQuery(
    GET_USER_DETAIL,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  const [userInfo, setUserInfo] = useState({});

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const handleDeleteUser = () => {
    Alert.alert('Delete User', 'User will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    console.log('kia ha id', id);
    getUserInfo(id);
  }, [id]);

  const getUserInfo = async userId => {
    try {
      const getUserDetails = await LoadUserDetail({
        variables: {
          id: userId,
        },
      });
      const {email, firstName, lastName, role} =
        getUserDetails?.data?.getUserById?.data;
      console.log(getUserDetails?.data?.getUserById?.data);
      handleRoleCheck(role);
      setUserInfo({email, firstName, lastName, role});
    } catch (e) {
      console.log('error while fetching', e);
    }
  };

  const handleRoleCheck = role => {
    role.map(item => {
      switch (item) {
        case 'ADMIN':
          setCheck1(true);
          return;
        case 'USER':
          setCheck2(true);
          return;
        case 'RIDER':
          setCheck3(true);
          return;
        default:
          break;
      }
    });
  };

  if (mode === 'add') {
    return (
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <OverlayLoader show={userLoader} />
        <MyHeader
          title="Add New User"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView style={{paddingHorizontal: 10}}>
          <MySubHeader title="Add User Details" divider />
          <MyInput label="First Name" />
          <MyInput label="Last Name" />
          <MyInput label="Email Address" />
          <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
            <MyText
              label={'Roles'}
              size={SCREEN_HEIGHT * 0.028}
              textStyle={{paddingBottom: 10}}
            />
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                title="Admin"
                checked={check1}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck1(!check1)}
              />
              <CheckBox
                title="User"
                checked={check2}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck2(!check2)}
              />
              <CheckBox
                title="Rider"
                checked={check3}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck3(!check3)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{height: 60}}>
          <BottomButton
            label="Add User"
            count={0}
            totalCount={1}
            enabled={false}
            onPress={() => console.log('Done')}
          />
        </View>
      </View>
    );
  }
  if (mode === 'edit') {
    return (
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <OverlayLoader show={userLoader} />

        <MyHeader
          title="Edit User"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
          rightIconType="foundation"
          icon="trash"
          onPressRight={() => handleDeleteUser()}
        />
        <ScrollView style={{paddingHorizontal: 10}}>
          <MySubHeader title="Edit User Details" divider />
          <MyInput label="First Name" value={userInfo.firstName} />
          <MyInput label="Last Name" value={userInfo.lastName} />
          <MyInput label="Email Address" value={userInfo.email} />
          <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
            <MyText
              label={'Roles'}
              size={SCREEN_HEIGHT * 0.028}
              textStyle={{paddingBottom: 10}}
            />
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                title="Admin"
                checked={check1}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck1(!check1)}
              />
              <CheckBox
                title="User"
                checked={check2}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck2(!check2)}
              />
              <CheckBox
                title="Rider"
                checked={check3}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{padding: 0, alignSelf: 'center'}}
                onPress={() => setCheck3(!check3)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{height: 60}}>
          <BottomButton
            label="Add User"
            count={0}
            totalCount={1}
            enabled={false}
            onPress={() => console.log('Done')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
