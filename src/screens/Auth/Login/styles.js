import {Dimensions, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {Fonts} from '../../../utils/fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputStyle: {
    // width: width * 0.8,
    // height: height * 0.07,
    // borderRadius: height * 0.005,
    // paddingLeft: height * 0.015,
    // borderWidth: height * 0.001,
    // marginVertical: height * 0.01,
    // fontFamily: Fonts.Roboto_Medium,
    // color: 'black',

    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(40),
    borderRadius: SCREEN_HEIGHT * 0.005,
    // paddingHorizontal: SCREEN_HEIGHT * 0.015,
    borderWidth: SCREEN_HEIGHT * 0.001,
    marginVertical: SCREEN_HEIGHT * 0.01,
    // fontFamily: Fonts.Roboto_Medium,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: '#11a79c',
    width: width * 0.8,
    height: moderateVerticalScale(45),
    borderRadius: height * 0.005,
    paddingLeft: height * 0.015,
    marginVertical: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: height * 0.003,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    width: width * 0.8,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default styles;
