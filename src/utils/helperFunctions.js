import storage from '@react-native-firebase/storage';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import { Image } from 'react-native-compressor';
import { NativeModules } from 'react-native';

const RNFetchBlob = NativeModules.RNFetchBlob;

export const deleteImage = async url => {
  try {
    const urlForDelete = url;
    const fileNameForDelete = urlForDelete?.split('%2F')[1]?.split('?')[0];
    const storageDelete = storage().ref(`images/${fileNameForDelete}`);
    await storageDelete.delete();
  } catch (e) {
    console.error('Upload Image Error', e);
  }
};

export const imageCompressor = async url => {
  try {
    const result = await Image.compress(url, {
      compressionMethod: 'auto',
    });
    return result;
  } catch (error) {
    console.log(' imageCompressor error ', error);
  }
};

export const uploadImage = async (image, previousImage = '') => {
  var url;
  const { uri: path } = image;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const uri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
  const uploadUri = await imageCompressor(uri);
  const storageRef = storage().ref(`images/${filename}`);

  try {
    const task = await storageRef.putFile(uploadUri);
    url = await storageRef.getDownloadURL();
    if (
      previousImage != '' &&
      previousImage?.includes('https://firebasestorage')
    ) {
      await deleteImage(previousImage);
    }
  } catch (e) {
    console.error('Upload Image Error', e.message);
  }
  return url;
};

export const uploadOnlineImage = async (imageUrl, previousImage = '') => {
  try {
    const result = await RNFetchBlob.config({
      path: RNFetchBlob.fs.dirs.DocumentDir + `/${imageUrl?.split('/').pop()}`,
    }).fetch('GET', imageUrl);
    const compressUrl = await imageCompressor(`file://${result.data}`);
    return await uploadImage({ uri: compressUrl }, previousImage);
  } catch (error) {
    console.error('uploadOnlineImage', error);
    throw error;
  }
};

export const sendFCMToken = async () => {
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const fcmToken = await messaging().getToken();

  console.log('fcmToken fcmToken', fcmToken);

  return fcmToken;
};

export const imagePicker = async () => {
  try {
    const result = await launchImageLibrary({
      selectionLimit: 1,
    });
    return result?.assets[0];
  } catch (error) {
    console.log('imagePicker error', error);
  }
};

export const cameraPicker = async () => {
  try {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    return result?.assets[0];
  } catch (error) {
    console.log('cameraPicker error', error);
  }
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const isValidTimeToOrder = () => {
  var format = 'hh:mm:ss';

  // var time = moment() gives you current time. no format required.
  var time = moment(new Date().toLocaleTimeString(), format),
    startTime = moment('09:00:00', format),
    endTime = moment('13:00:00', format);
  return time.isBetween(startTime, endTime);
};

export const greetMessage = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'Good Morning! 🙋‍♂️';
  } else if (curHr < 18) {
    return 'Good Afternoon! 🙋‍♂️';
  } else {
    return 'Good Evening! 🙋‍♂️';
  }
};
