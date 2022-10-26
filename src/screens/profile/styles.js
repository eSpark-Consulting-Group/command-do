import {Dimensions, StyleSheet} from 'react-native';
import { Fonts } from '../../utils/fonts';
const { width, height } = Dimensions.get('window')
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
    chooseImageButton: {
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
    },
    profileContainer: {
      height: height * .25,
      width: width * 1,
      // backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: height * .0005,
      borderBottomColor: '#00000070'
    },
    backButtonStyle: {
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
    },
    profileBackground: {
      height: height * .15,
      width: height * .15,
      backgroundColor: "white",
      borderRadius: height * 1,
      elevation: height * .01,
    },
    profileImage: {
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
    },
    profileImageStyle: {
      borderRadius: height * 1,
      height: height * .15,
      width: height * .15,
      backgroundColor: 'white',
      resizeMode: "contain",
    },
    editProfileStyle: {
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
    },
    profileFormStyle: {
      height: height * .75,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileFormAlign: {
      height: height * .15,
      width: width * .9,
      backgroundColor: "white",
      borderRadius: height * .005,
      elevation: height * .005,
      marginVertical: height * .015,
      padding: height * .02,
      justifyContent: 'center'
    },
    profileFormMobileNumber: {
      height: height * .057,
      maxWidth: width * .75,
      fontFamily: Fonts.Roboto_Medium,
      color: 'black',
      fontSize: height * .02,
      // backgroundColor: 'red'
    }
  })

export default styles;
