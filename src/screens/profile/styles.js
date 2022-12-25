import {Dimensions, StyleSheet} from 'react-native';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../theme';
import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalInner: {
    height: height * 0.3,
    width: width * 0.8,
    backgroundColor: colors.background,
    borderRadius: height * 0.005,
    elevation: moderateVerticalScale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseImageButton: {
    height: height * 0.07,
    width: width * 0.6,
    backgroundColor: colors.primary,
    borderRadius: height * 0.005,
    elevation: moderateVerticalScale(2),
    marginVertical: height * 0.01,
    padding: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileContainer: {
    width: width * 1,
    height: verticalScale(220),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButtonStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBackground: {
    borderColor: colors.primary + '50',
    borderWidth: moderateVerticalScale(2),
    borderRadius: height * 1,
    bottom: moderateVerticalScale(55),
  },
  profileImage: {
    height: moderateVerticalScale(30, 1),
    width: moderateVerticalScale(30, 1),
    elevation: moderateVerticalScale(3),
    margin: height * 0.015,
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: moderateVerticalScale(1),
    borderRadius: moderateVerticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    right: moderateVerticalScale(-8),
    bottom: moderateVerticalScale(-8),
  },
  profileImageStyle: {
    borderRadius: height * 1,
    borderWidth: 2,
    height: moderateVerticalScale(130),
    width: moderateVerticalScale(130),
    backgroundColor: colors.background,
    resizeMode: 'contain',
  },
  editProfileStyle: {
    height: moderateVerticalScale(35),
    width: moderateVerticalScale(35),
    elevation: moderateVerticalScale(3),
    borderRadius: moderateVerticalScale(35),
    margin: height * 0.015,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
  },
  profileFormStyle: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileFormAlign: {
    height: height * 0.15,
    width: width * 0.9,
    backgroundColor: colors.background,
    borderRadius: height * 0.005,
    elevation: moderateVerticalScale(2),
    marginVertical: height * 0.015,
    padding: height * 0.02,
    justifyContent: 'center',
  },
  profileFormMobileNumber: {
    height: height * 0.057,
    maxWidth: width * 0.75,
    fontFamily: Fonts.Roboto_Medium,
    color: 'black',
    fontSize: height * 0.02,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default styles;
