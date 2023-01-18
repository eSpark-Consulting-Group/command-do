// import storage from '@react-native-firebase/storage';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

export const uploadImage = async image => {
  var url;
  const { uri: path, sourceURL } = image;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
  const storageRef = storage().ref(`images/${filename}`);
  console.log('storageRef', uploadUri);
  try {
    //  url = await storageRef.getDownloadURL()
    console.log('aya ha kuch');
    const task = await storageRef.putFile(uploadUri);
    url = await storageRef.getDownloadURL();
  } catch (e) {
    console.error('Upload Image Error', e);
  }
  return url;
};

export const sendFCMToken = async () => {
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  fcmToken = await messaging().getToken();

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
  if (Platform.OS === 'android') {
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
  }
};

export const isValidTimeToOrder = time => {
  var format = 'hh:mm:ss';

  // var time = moment() gives you current time. no format required.
  var time = moment(new Date(time).toLocaleTimeString(), format),
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
