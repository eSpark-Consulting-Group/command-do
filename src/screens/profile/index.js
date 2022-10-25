import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity, StatusBar, ScrollView, Image, Pressable, StyleSheet, Animated } from 'react-native';
import { Fonts } from '../../utils/fonts';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import { Delievey } from "../../assets/images";
import NumericInput from 'react-native-numeric-input'
import AwesomeAlert from 'react-native-awesome-alerts';
import { MyText, CustomizeModal } from "../../components";
import { ProfileImage } from "../../assets/images";
import { updateProfile } from '../../features/profile/profileSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const { width, height } = Dimensions.get('window');

function Profile({ route, navigation }) {
  const [getData, setGetData] = useState([
    {
      name: 'Name',
      value: reduxData?.profile?.name,
    },
    {
      name: 'Email',
      value: reduxData?.profile?.email,
    },
    {
      name: 'Shift',
      value: reduxData?.profile?.shift,
    },
    {
      name: 'Mobile Number',
      value: reduxData?.profile?.phone,
    },

  ]);
  const dispatch = useDispatch();
  const reduxData = useSelector(store => store);
  // const [press, setPress] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  useEffect(() => {
    // console.log("timer--->",timer);
    const profileUpdate = [...getData];
    profileUpdate[0].value = reduxData?.profile?.name;
    profileUpdate[1].value = reduxData?.profile?.email;
    profileUpdate[2].value = reduxData?.profile?.shift;
    profileUpdate[3].value = reduxData?.profile?.phone;
    setGetData(profileUpdate)
  }, [reduxData?.profile])

  const editModeon = () => {
    setEditMode(true)
  }

  const saveModeon = (index) => {
    setEditMode(false)
    const profileUpdate = [...getData];
    const profileChangeData = {
      name: profileUpdate[0].value,
      shift: profileUpdate[2].value,
      phone: profileUpdate[3].value,
    }
    dispatch(updateProfile(profileChangeData))
    // setIndex(5)
  }

  const onChangeNumber = (value, index) => {
    // console.log('value---->', value);

    var changeData = [...getData];
    changeData[index].value = value;
    setGetData(changeData);
  }

  const isModalVisible = () => {

    setIsModal(!isModal)
  }

  async function chooseImage() {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchCamera(options);

    console.log('Response = ', result);
    // ImagePicker.showImagePicker(options, (response) => {

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     const source = { uri: response.uri };

    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     // alert(JSON.stringify(response));s
    //     console.log('response', JSON.stringify(response));
    //     // this.setState({
    //     //   filePath: response,
    //     //   fileData: response.data,
    //     //   fileUri: response.uri
    //     // });
    //     setFilePath(response);
    //     setFileData(response.data);
    //     setFileUri(response.uri);
    //   }
    // });
  }

  // const launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       setFilePath(response);
  //       setFileData(response.data);
  //       setFileUri(response.uri);
  //       // this.setState({
  //       //   filePath: response,
  //       //   fileData: response.data,
  //       //   fileUri: response.uri
  //       // });
  //     }
  //   });

  // }
  // const launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       // this.setState({
  //       //   filePath: response,
  //       //   fileData: response.data,
  //       //   fileUri: response.uri
  //       // });
  //       setFilePath(response);
  //       setFileData(response.data);
  //       setFileUri(response.uri);
  //     }
  //   });

  // }

  return (
    <ScrollView style={{ height: height * 1, backgroundColor: 'white' }} >
      <CustomizeModal
        isVisible={isModal}
        setBackDrop={isModalVisible}
        navigation={navigation}
        renderData={
          <View style={styles.modalInner}>
            <TouchableOpacity style={{
              height: height * .07,
              width: width * .6,
              backgroundColor: "#11a79c",
              borderRadius: height * .005,
              elevation: height * .005,
              marginVertical: height * .01,
              padding: height * .02,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
              onPress={chooseImage}
            >
              <Icon name="md-file-tray-outline" size={height * .03} color='#fff' />
              <MyText label={"Choose File"} title style={{ color: "#fff", marginLeft: height * .01 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: height * .07,
              width: width * .6,
              backgroundColor: "#11a79c",
              borderRadius: height * .005,
              elevation: height * .005,
              marginVertical: height * .01,
              padding: height * .02,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',

            }}
              onPress={launchCamera}
            >
              <Icon name="camera-outline" size={height * .03} color='#fff' />
              <MyText label={"Launch Camera"} title style={{ color: "#fff", marginLeft: height * .01 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: height * .07,
              width: width * .6,
              backgroundColor: "#11a79c",
              borderRadius: height * .005,
              elevation: height * .005,
              marginVertical: height * .01,
              padding: height * .02,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',

            }}
              onPress={launchImageLibrary}
            >
              <Icon name="image-outline" size={height * .03} color='#fff' />
              <MyText label={"Choose in gallery"} title style={{ color: "#fff", marginLeft: height * .01 }} />

            </TouchableOpacity>
          </View>
        } />


      <View style={{
        height: height * .25,
        width: width * 1,
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: height * .0005,
        borderBottomColor: '#00000070'
      }}>
        <TouchableOpacity style={{
          height: height * .05,
          elevation: height * .003,
          width: height * .05,
          backgroundColor: '#11a79c',
          borderRadius: height * 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          left: height * .02,
          top: height * .02
        }}
          onPress={() => navigation.goBack()}>
          <View>
            <Icon name="ios-chevron-back-outline" size={height * .03} color='#fff' />
          </View>
        </TouchableOpacity>
        <View style={{
          height: height * .15,
          width: height * .15,
          backgroundColor: "white",
          borderRadius: height * 1,
          elevation: height * .01,
        }}>
          <TouchableOpacity style={{
            height: height * .03,
            elevation: height * .003,
            width: height * .03,
            margin: height * .015,
            backgroundColor: '#11a79c',
            borderRadius: height * 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
            right: height * -.005,
            top: height * -.005,

          }}
            onPress={() => setIsModal(!isModal)}>
            <View>
              <Icon name="ios-pencil" size={height * .018} color='#fff' />
            </View>
          </TouchableOpacity>
          <Image source={reduxData?.profile?.image} style={{
            borderRadius: height * 1,
            height: height * .15,
            width: height * .15,
            backgroundColor: 'white',
            resizeMode: "contain",
          }} />
        </View>
        <TouchableOpacity style={{
          height: height * .05,
          elevation: height * .003,
          width: height * .05,
          margin: height * .015,
          backgroundColor: '#11a79c',
          borderRadius: height * 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          right: height * .0,
          bottom: height * .0,
        }}
          onPress={() => editMode ? saveModeon() : editModeon()}
        >
          <View>
            <Icon name={editMode ? "save-sharp" : "ios-pencil"} size={height * .025} color='#fff' />
            {/* <Icon name={"ios-pencil"} size={height * .025} color='#fff' /> */}

          </View>
        </TouchableOpacity>
      </View>
      <View style={{
        height: height * .75,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'

      }}>
        {getData &&
          getData.map((item, index) =>
            <View key={index} style={{
              height: height * .15,
              width: width * .9,
              backgroundColor: "white",
              borderRadius: height * .005,
              elevation: height * .005,
              marginVertical: height * .015,
              padding: height * .02,
              justifyContent: 'center'
            }}>

              {/* item.name != "Email" && */}
              <MyText label={item.name} subTitle style={{ color: "#00000060", }} />
              {
                editMode && item.name != "Email" ?
                  <TextInput style={{
                    height: height * .057,
                    maxWidth: width * .75,
                    fontFamily: Fonts.Roboto_Medium,
                    color: 'black',
                    fontSize: height * .02,
                    // backgroundColor: 'red'
                  }}
                    maxLength={item.name == "Mobile Number" ? 11 : 30}
                    onChangeText={(value) => onChangeNumber(value, index)}
                    value={item.value}
                    keyboardType={item.name == "Mobile Number" ? "number-pad" : "default"}
                  />
                  :
                  <MyText label={item.value} title style={{ color: "#11a79c", marginVertical: height * .015 }} />
              }


            </View>
          )

        }

      </View>
    </ScrollView >
  );
};

// trash-outline

export default Profile;

const styles = StyleSheet.create({
  modalInner: {
    height: height * .3,
    width: width * .8,
    backgroundColor: '#fff',
    borderRadius: height * .005,
    elevation: height * .003,
    justifyContent: 'center',
    alignItems: 'center'
  },

})