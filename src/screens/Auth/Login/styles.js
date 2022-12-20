import {Dimensions, StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
  },
  mainLogoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_HEIGHT * 0.243,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  inputContainerStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(40),
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '100%',
    paddingHorizontal: 10,
  },
  showHidePassBtn: {
    right: moderateVerticalScale(35),
    height: moderateVerticalScale(30),
    width: moderateVerticalScale(30),
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(45),
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: SCREEN_HEIGHT * 0.003,
  },
  loginButtonText: {
    fontSize: moderateVerticalScale(20),
    color: colors.text_inverse,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  radioButtonText: {fontSize: 12, marginLeft: 0, marginRight: 5},
  radioButtonInnerContainer: {padding: 0, alignSelf: 'center'},
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

export default styles;
