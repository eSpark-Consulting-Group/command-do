import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@apollo/client';

import {MyText, CustomizeModal, OverlayLoader} from '../../components';
import styles from './styles';
import {updateUserDetails} from '../../features/userInfo/userInfoSlice';
import {UPDATE_USER} from '../../graphQL/mutation/user.mutation';
import {
  cameraPicker,
  imagePicker,
  uploadImage,
} from '../../utils/helperFunctions';
import {colors} from '../../theme';

const {width, height} = Dimensions.get('window');

function Profile({route, navigation}) {
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

  const [UpdateProfile] = useMutation(UPDATE_USER);

  const editModeon = () => {
    setEditMode(true);
  };

  const saveModeon = async index => {
    setEditMode(false);
    console.log('Save mode');
    const profileUpdate = [...getData];
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
    dispatch(updateUserDetails({selected: userData?.selected, ...updatedData}));
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
      const url = await uploadImage(image);
      const updateUser = await UpdateProfile({
        variables: {
          updateProfileId: userData?.id,
          avatar: url,
        },
      });
      const updatedData = updateUser.data.updateProfile.data;
      dispatch(
        updateUserDetails({selected: userData?.selected, ...updatedData}),
      );
      setLoader(false);
    } catch (error) {
      isModalVisible();
      setLoader(false);
      console.log('error error error', error);
    }
  };
  return (
    <ScrollView style={{height: height * 1, backgroundColor: 'white'}}>
      <OverlayLoader show={loader} />
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
        <TouchableOpacity
          style={styles.backButtonStyle}
          onPress={() => navigation.goBack()}>
          <View>
            <Icon
              name="ios-chevron-back-outline"
              size={height * 0.03}
              color={colors.text_inverse}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.profileBackground}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={() => setIsModal(!isModal)}>
            <View>
              <Icon
                name="ios-pencil"
                size={height * 0.018}
                color={colors.text_inverse}
              />
            </View>
          </TouchableOpacity>
          <Image
            source={{
              uri:
                userData?.avatar ??
                'https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png',
            }}
            onLoadStart={() => setImgLoader(true)}
            onLoadEnd={() => setImgLoader(false)}
            style={styles.profileImageStyle}
          />
          <ActivityIndicator
            style={styles.activityIndicator}
            animating={imgLoader}
          />
        </View>
        <TouchableOpacity
          style={styles.editProfileStyle}
          onPress={() => (editMode ? saveModeon() : editModeon())}>
          <View>
            <Icon
              name={editMode ? 'save-sharp' : 'ios-pencil'}
              size={height * 0.025}
              color={colors.text_inverse}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileFormStyle}>
        {getData &&
          getData.map((item, index) => (
            <View key={index} style={styles.profileFormAlign}>
              <MyText
                label={item.name}
                subTitle
                textStyle={{color: '#00000060'}}
              />
              {editMode && item.name != 'Email' ? (
                <TextInput
                  style={styles.profileFormMobileNumber}
                  maxLength={item.name == 'Mobile Number' ? 11 : 30}
                  onChangeText={value => onChangeNumber(value, index)}
                  value={item.value}
                  keyboardType={
                    item.name == 'Mobile Number' ? 'number-pad' : 'default'
                  }
                />
              ) : (
                <MyText
                  label={item.value}
                  title
                  textStyle={{
                    color: colors.primary,
                    marginVertical: height * 0.015,
                  }}
                />
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

// trash-outline

export default Profile;
