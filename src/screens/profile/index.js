import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMutation } from '@apollo/client';

import { MyText, CustomizeModal, OverlayLoader } from '../../components';
import styles from './styles';
import { updateUserDetails } from '../../features/userInfo/userInfoSlice';
import { UPDATE_USER } from '../../graphQL/mutation/user.mutation';
import {
  cameraPicker,
  imagePicker,
  uploadImage,
} from '../../utils/helperFunctions';
import { colors } from '../../theme';
import {
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get('window');

function Profile({ route, navigation }) {
  const reduxData = useSelector(store => store);
  const userData = reduxData?.userInfo?.userData;
  const [getData, setGetData] = useState([
    {
      name: 'First Name',
      value: userData?.firstName,
    },
    {
      name: 'Last Name',
      value: userData?.lastName,
    },
    {
      name: 'Email',
      value: userData?.email,
    },
    {
      name: 'Mobile Number',
      value: userData?.phoneNumber ?? 'N/A',
    },
  ]);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImgLoader] = useState(true);

  const [UpdateProfile, { loading }] = useMutation(UPDATE_USER);

  const editModeon = () => {
    setEditMode(true);
  };

  const saveModeon = async index => {
    const profileUpdate = [...getData];
    console.log('Save mode', profileUpdate);
    if (!profileUpdate[0]?.value || !profileUpdate[1]?.value) {
      showMessage({
        message: 'First Name and Last Name is required',
        type: 'danger',
      });
      return;
    }
    setEditMode(false);
    const data = {
      updateProfileId: userData?.id,
      role: userData?.role,
      firstName: profileUpdate[0].value,
      lastName: profileUpdate[1].value,
      phoneNumber: profileUpdate[3].value,
      avatar: userData?.avatar,
    };
    const updateUser = await UpdateProfile({
      variables: data,
    });
    const updatedData = updateUser.data.updateProfile.data;
    dispatch(
      updateUserDetails({ selected: userData?.selected, ...updatedData }),
    );
  };

  const cancelUpdate = () => {
    setEditMode(false);
    setGetData([
      {
        name: 'First Name',
        value: userData?.firstName,
      },
      {
        name: 'Last Name',
        value: userData?.lastName,
      },
      {
        name: 'Email',
        value: userData?.email,
      },
      {
        name: 'Mobile Number',
        value: userData?.phoneNumber ?? 'N/A',
      },
    ]);
  };

  const onChangeNumber = (value, index) => {
    var changeData = [...getData];
    changeData[index].value = value;
    setGetData(changeData);
  };

  const isModalVisible = () => {
    setIsModal(!isModal);
  };

  const onImagePicker = async (pickerFunc = imagePicker) => {
    try {
      const image = await pickerFunc();
      setLoader(true);
      isModalVisible();
      const url = await uploadImage(image, userData?.avatar);
      const updateUser = await UpdateProfile({
        variables: {
          updateProfileId: userData?.id,
          avatar: url,
        },
      });
      const updatedData = updateUser.data.updateProfile.data;
      dispatch(
        updateUserDetails({ selected: userData?.selected, ...updatedData }),
      );
      setLoader(false);
    } catch (error) {
      isModalVisible();
      setLoader(false);
      console.log('error error error', error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <OverlayLoader show={loader || loading} />
      <CustomizeModal
        isVisible={isModal}
        setBackDrop={isModalVisible}
        navigation={navigation}
        renderData={
          <View style={styles.modalInner}>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={() => onImagePicker(cameraPicker)}>
              <Icon
                name="camera-outline"
                size={height * 0.03}
                color={colors.text_inverse}
              />
              <MyText
                label={'Launch Camera'}
                title
                textStyle={{
                  color: colors.text_inverse,
                  marginLeft: height * 0.01,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={() => onImagePicker(imagePicker)}>
              <Icon
                name="image-outline"
                size={height * 0.03}
                color={colors.text_inverse}
              />
              <MyText
                label={'Choose in gallery'}
                title
                textStyle={{
                  color: colors.text_inverse,
                  marginLeft: height * 0.01,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={styles.profileContainer}>
        <View
          style={{
            width: '100%',
            height: verticalScale(130),
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: colors.primary + '99',
            padding: 5,
            borderBottomWidth: height * 0.0005,
            borderBottomColor: '#00000070',
          }}>
          <TouchableOpacity
            style={styles.backButtonStyle}
            onPress={() => {
              if (editMode) {
                cancelUpdate();
              } else {
                navigation.goBack();
              }
            }}>
            <View>
              {editMode ? (
                <MyText
                  label={'Cancel'}
                  size={'subHeading'}
                  textStyle={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: moderateVerticalScale(18),
                    color: colors.text_inverse,
                  }}
                />
              ) : (
                <Icon
                  name="arrow-back"
                  size={moderateVerticalScale(28)}
                  color={colors.text_inverse}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <MyText
              label={editMode ? 'Edit Profile' : 'Profile'}
              size={'subHeading'}
              textStyle={{
                fontFamily: 'Poppins-SemiBold',
                color: colors.text_inverse,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => (editMode ? saveModeon() : editModeon())}
            style={{
              position: 'absolute',
              right: 0,
              padding: moderateVerticalScale(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MyText
              label={editMode ? 'Save' : 'Edit'}
              textStyle={{
                fontFamily: 'Poppins-Medium',
                fontSize: moderateVerticalScale(18),
                color: colors.text_inverse,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileBackground}>
          {editMode && (
            <TouchableOpacity
              style={styles.profileImage}
              onPress={() => setIsModal(!isModal)}>
              <View>
                <MCI
                  name="camera-image"
                  size={moderateVerticalScale(18)}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          )}
          <Image
            source={{
              uri:
                userData?.avatar ??
                'https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png',
            }}
            // resizeMode={'contain'}
            onLoadStart={() => setImgLoader(true)}
            onLoadEnd={() => setImgLoader(false)}
            style={styles.profileImageStyle}
          />
          <ActivityIndicator
            style={styles.activityIndicator}
            animating={imgLoader}
          />
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.profileFormStyle}>
          {getData &&
            getData.map((item, index) => (
              <View key={index} style={styles.profileFormAlign}>
                <MyText
                  label={item.name}
                  textStyle={{
                    color: '#00000060',
                    fontFamily: 'Poppins-SemiBold',
                  }}
                />
                <TextInput
                  style={{
                    ...styles.profileFormMobileNumber,
                    fontFamily: 'Poppins-Regular',
                    borderBottomColor:
                      editMode && item.name != 'Email'
                        ? '#00000090'
                        : '#00000060',
                    color:
                      editMode && item.name != 'Email'
                        ? 'black'
                        : colors.primary,
                  }}
                  editable={editMode && item.name != 'Email'}
                  maxLength={item.name == 'Mobile Number' ? 11 : 30}
                  onChangeText={value => onChangeNumber(value, index)}
                  value={
                    !editMode && index == 3 && !item.value ? 'N/A' : item.value
                  }
                  keyboardType={
                    item.name == 'Mobile Number' ? 'number-pad' : 'default'
                  }
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

// trash-outline

export default Profile;
