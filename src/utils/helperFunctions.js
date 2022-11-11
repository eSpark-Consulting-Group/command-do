import storage from '@react-native-firebase/storage'
import { PermissionsAndroid, Platform } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const uploadImage = async image => {
    var url 
      const { uri: path, sourceURL } = image
      const filename = path.substring(path.lastIndexOf('/') + 1)
      const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path
      const storageRef = storage().ref(`images/${filename}`)
      console.log("storageRef", uploadUri);
      try {
        //  url = await storageRef.getDownloadURL()
        const task = await storageRef.putFile(uploadUri)
        url = await storageRef.getDownloadURL()
      } catch (e) {
        console.error('Upload Image Error', e)
      }
    return url
}

export const imagePicker = async () => {
  try {
    const result = await launchImageLibrary({
      selectionLimit: 1
    });
    console.log('imagePicker result', result?.assets[0]);
    return result?.assets[0];
  } catch (error) {
    console.log('imagePicker error', error);
  }
};

export const cameraPicker = async () => {
  try {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back'
    });
    console.log('cameraPicker result', result);
    return result;
  } catch (error) {
    console.log('cameraPicker error', error);
  }
};
  
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};