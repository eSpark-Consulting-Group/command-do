import {Dimensions, StyleSheet} from 'react-native';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';

import {colors} from '../../../theme';
import {Fonts} from '../../../utils/fonts';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemImageContainer: {
    // height: height * 0.72,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  itemImageBackIcon: {
    height: moderateVerticalScale(35),
    elevation: 2,
    width: moderateVerticalScale(35),
    margin: height * 0.015,
    backgroundColor: colors.background,
    borderRadius: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numericBtnContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeNumericButton: {
    borderRadius: height * 1,
    backgroundColor: colors.primary,
    elevation: 2,
    height: moderateVerticalScale(35),
    width: moderateVerticalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    height: moderateVerticalScale(50),
    marginHorizontal: moderateVerticalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNumericButton: {
    borderRadius: height * 1,
    backgroundColor: colors.primary,
    elevation: 2,
    height: moderateVerticalScale(35),
    width: moderateVerticalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetailContainer: {
    backgroundColor: colors.background,
    alignItems: 'center',
    position: 'relative',
    bottom: moderateVerticalScale(15),
    padding: moderateVerticalScale(15),
    borderTopRightRadius: height * 0.04,
    borderTopLeftRadius: height * 0.04,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteStyle: {
    borderRadius: height * 0.005,
    padding: height * 0.03,
    borderWidth: height * 0.001,
    marginVertical: height * 0.02,
    fontFamily: Fonts.Roboto_Medium,
    color: colors.text_normal,
    fontSize: height * 0.015,
  },
  cartButtonStyle: {
    backgroundColor: colors.primary,
    height: moderateVerticalScale(42),
    paddingLeft: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountStyle: {
    position: 'absolute',
    right: height * 0.01,
    borderWidth: height * 0.002,
    borderColor: colors.background,
    borderRadius: height * 1,
    height: moderateVerticalScale(28),
    width: moderateVerticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
