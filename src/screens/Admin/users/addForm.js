import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import { useLazyQuery, useMutation } from '@apollo/client';
import { showMessage } from 'react-native-flash-message';

import {
  BottomButton,
  MyHeader,
  MyInput,
  MySubHeader,
  MyText,
  OverlayLoader,
} from '../../../components';
import { colors } from '../../../theme';
import { SCREEN_HEIGHT } from '../../../constants';
import { GET_USER_DETAIL } from '../../../graphQL/query/user.query';
import {
  EDIT_USER,
  DELETE_USER,
  CREATE_USER,
} from '../../../graphQL/mutation/user.mutation';
import { moderateVerticalScale } from 'react-native-size-matters';
import { deleteImage } from '../../../utils/helperFunctions';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    mode,
    userInfo: { id },
  } = route?.params;

  const [EditUser, { loading: editLoader }] = useMutation(EDIT_USER);
  const [DeleteUser, { loading: deleteLoader }] = useMutation(DELETE_USER);
  const [AddUser, { loading: addLoader }] = useMutation(CREATE_USER);

  const [LoadUserDetail, { loading: userLoader, data: userData }] =
    useLazyQuery(GET_USER_DETAIL, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    });

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const roleSetter = [
    check1 && 'ADMIN',
    check2 && 'USER',
    check3 && 'RIDER',
  ].filter(item => item != false);

  const cond2 = check1 || check2 || check3;

  const cond1 =
    userInfo.firstName !== '' &&
    userInfo.lastName !== '' &&
    userInfo.email !== '';

  console.log('suis=>>', userInfo, roleSetter);

  const handleDeleteUser = () => {
    const _deleteUser = async () => {
      const res = await DeleteUser({
        variables: {
          deleteUserId: id,
        },
      });
      if (res?.data?.deleteUser?.status) {
        navigation.goBack();
        showMessage({
          message: res?.data?.deleteUser?.message,
          autoHide: true,
          type: 'success',
        });
      }
    };
    Alert.alert('Delete User', 'User will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
        onPress: _deleteUser,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    console.log('userInfo?:', userInfo);
    if (id !== null) {
      console.log('kia ha id', id);
      getUserInfo(id);
    }
  }, [id]);

  const getUserInfo = async userId => {
    try {
      const getUserDetails = await LoadUserDetail({
        variables: {
          getUserByIdId: userId,
        },
      });
      const { email, firstName, lastName, role } =
        getUserDetails?.data?.getUserById?.data;
      console.log('popopopopopopop', getUserDetails?.data?.getUserById?.data);
      handleRoleCheck(role);
      setUserInfo({ email, firstName, lastName, role });
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

  const handleAddUser = async () => {
    const { firstName, lastName, email } = userInfo;
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      role: roleSetter,
    };
    const response = await AddUser({
      variables: data,
    });
    console.log('add data =>>', data);
    console.log('res =>', response.data);
    if (response.data.createUser.status) {
      navigation.goBack();
      showMessage({
        message: response.data.createUser.message,
        autoHide: true,
        type: 'success',
      });
    }
  };

  const handleEditUser = async () => {
    const { firstName, lastName } = userInfo;
    const data = {
      updateProfileId: id,
      firstName: firstName,
      lastName: lastName,
      role: roleSetter,
    };
    const response = await EditUser({
      variables: data,
    });
    console.log('ss', data);
    console.log('res =>', response.data);
    if (response.data.updateProfile.status) {
      navigation.goBack();
      showMessage({
        message: response.data.updateProfile.message,
        autoHide: true,
        type: 'success',
      });
    }
  };

  if (mode === 'add') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <OverlayLoader show={userLoader || addLoader} />
        <MyHeader
          title="Add New User"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <MySubHeader title="Add User Details" divider />
          <MyInput
            label="First Name"
            value={userInfo.firstName}
            placeholderValue={'Enter First Name...'}
            handleChangeText={text =>
              setUserInfo({ ...userInfo, firstName: text })
            }
          />
          <MyInput
            label="Last Name"
            value={userInfo.lastName}
            placeholderValue={'Enter Last Name...'}
            handleChangeText={text =>
              setUserInfo({ ...userInfo, lastName: text })
            }
          />
          <MyInput
            label="Email Address"
            value={userInfo.email}
            placeholderValue={'Enter Email Address...'}
            handleChangeText={text => setUserInfo({ ...userInfo, email: text })}
          />
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <MyText
              label={'Roles'}
              size={SCREEN_HEIGHT * 0.028}
              textStyle={{ paddingBottom: 10 }}
            />
            <View style={{ flexDirection: 'row' }}>
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
                containerStyle={{ padding: 0, alignSelf: 'center' }}
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
                containerStyle={{ padding: 0, alignSelf: 'center' }}
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
                containerStyle={{ padding: 0, alignSelf: 'center' }}
                onPress={() => setCheck3(!check3)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ height: 60 }}>
          <BottomButton
            label="Add User"
            count={cond1 && cond2 ? 1 : 0}
            totalCount={1}
            enabled={cond1 && cond2 ? true : false}
            onPress={handleAddUser}
          />
        </View>
      </View>
    );
  }
  if (mode === 'edit') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <OverlayLoader show={userLoader || editLoader || deleteLoader} />
        <MyHeader
          title="Edit User"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
          rightIconType="foundation"
          icon="trash"
          onPressRight={() => {
            handleDeleteUser();
            console.log(
              'userData?.getUserById?.data?.avatar',
              userData?.getUserById?.data?.avatar,
            );
            if (
              userData?.getUserById?.data?.avatar?.includes(
                'https://firebasestorage',
              )
            ) {
              deleteImage(userData?.getUserById?.data?.avatar);
            }
          }}
        />
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <MySubHeader title="Edit User Details" divider />
          <MyInput
            label="First Name"
            placeholderValue="First Name..."
            value={userInfo.firstName}
            handleChangeText={text =>
              setUserInfo({ ...userInfo, firstName: text })
            }
          />
          <MyInput
            label="Last Name"
            value={userInfo.lastName}
            placeholderValue="Last Name..."
            handleChangeText={text =>
              setUserInfo({ ...userInfo, lastName: text })
            }
          />
          <MyInput
            label="Email Address"
            placeholderValue="Enter Email Address..."
            value={userInfo.email}
            canEdit={false}
          />
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <MyText
              label={'Roles'}
              size={SCREEN_HEIGHT * 0.028}
              textStyle={{ paddingBottom: 10 }}
            />
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                title="Admin"
                checked={check1}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: moderateVerticalScale(12),
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{ padding: 0, alignSelf: 'center' }}
                onPress={() => setCheck1(!check1)}
              />
              <CheckBox
                title="User"
                checked={check2}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: moderateVerticalScale(12),
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{ padding: 0, alignSelf: 'center' }}
                onPress={() => setCheck2(!check2)}
              />
              <CheckBox
                title="Rider"
                checked={check3}
                checkedColor={colors.primary}
                textStyle={{
                  fontSize: moderateVerticalScale(12),
                  marginLeft: 0,
                  marginRight: 5,
                  fontFamily: 'sans-serif-medium',
                }}
                containerStyle={{ padding: 0, alignSelf: 'center' }}
                onPress={() => setCheck3(!check3)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ height: 60 }}>
          <BottomButton
            label="Edit User"
            count={cond1 && cond2 ? 1 : 0}
            totalCount={1}
            enabled={cond1 && cond2 ? true : false}
            onPress={() => handleEditUser()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
