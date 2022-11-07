import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {MyText, CustomizeModal} from '../../components';
import {updateProfile} from '../../features/profile/profileSlice';
import styles from './styles';
import {updateUserDetails} from '../../features/userInfo/userInfoSlice';
import {UPDATE_USER} from '../../graphQL/mutation/user.mutation';
import {useMutation} from '@apollo/client';

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

  const [UpdateProfile] = useMutation(UPDATE_USER);

  // useEffect(() => {
  //   // console.log("timer--->",timer);
  //   const profileUpdate = [...getData];
  //   profileUpdate[0].value = reduxData?.profile?.name;
  //   profileUpdate[1].value = reduxData?.profile?.email;
  //   profileUpdate[2].value = reduxData?.profile?.shift;
  //   profileUpdate[3].value = reduxData?.profile?.phone;
  //   setGetData(profileUpdate);
  // }, [reduxData?.profile]);

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
    dispatch(updateUserDetails(updatedData));

    // const profileUpdate = [...getData];
    // const profileChangeData = {
    //   name: profileUpdate[0].value,
    //   shift: profileUpdate[2].value,
    //   phone: profileUpdate[3].value,
    // };
    // dispatch(updateProfile(profileChangeData));
    // setIndex(5)`
  };

  const onChangeNumber = (value, index) => {
    // console.log('value---->', value);

    var changeData = [...getData];
    changeData[index].value = value;
    setGetData(changeData);
  };

  const isModalVisible = () => {
    setIsModal(!isModal);
  };

  async function chooseImage() {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchCamera(options);
  }

  return (
    <ScrollView style={{height: height * 1, backgroundColor: 'white'}}>
      <CustomizeModal
        isVisible={isModal}
        setBackDrop={isModalVisible}
        navigation={navigation}
        renderData={
          <View style={styles.modalInner}>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={chooseImage}>
              <Icon
                name="md-file-tray-outline"
                size={height * 0.03}
                color="#fff"
              />
              <MyText
                label={'Choose File'}
                title
                style={{color: '#fff', marginLeft: height * 0.01}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={launchCamera}>
              <Icon name="camera-outline" size={height * 0.03} color="#fff" />
              <MyText
                label={'Launch Camera'}
                title
                style={{color: '#fff', marginLeft: height * 0.01}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseImageButton}
              onPress={launchImageLibrary}>
              <Icon name="image-outline" size={height * 0.03} color="#fff" />
              <MyText
                label={'Choose in gallery'}
                title
                style={{color: '#fff', marginLeft: height * 0.01}}
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
              color="#fff"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.profileBackground}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={() => setIsModal(!isModal)}>
            <View>
              <Icon name="ios-pencil" size={height * 0.018} color="#fff" />
            </View>
          </TouchableOpacity>
          <Image
            source={userData?.avatar ?? reduxData?.profile?.image}
            style={styles.profileImageStyle}
          />
        </View>
        <TouchableOpacity
          style={styles.editProfileStyle}
          onPress={() => (editMode ? saveModeon() : editModeon())}>
          <View>
            <Icon
              name={editMode ? 'save-sharp' : 'ios-pencil'}
              size={height * 0.025}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileFormStyle}>
        {getData &&
          getData.map((item, index) => (
            <View key={index} style={styles.profileFormAlign}>
              <MyText label={item.name} subTitle style={{color: '#00000060'}} />
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
                  style={{color: '#11a79c', marginVertical: height * 0.015}}
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
