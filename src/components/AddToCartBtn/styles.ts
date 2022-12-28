import {Dimensions, StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {colors} from '../../theme';
import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  numericBtnContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateVerticalScale(50),
  },
  removeNumericButton: {
    borderRadius: moderateVerticalScale(20),
    backgroundColor: colors.primary,
    elevation: 2,
    height: moderateVerticalScale(30),
    width: moderateVerticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    // backgroundColor: 'red',
    width: moderateVerticalScale(30),
    // marginHorizontal: moderateVerticalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNumericButton: {
    borderRadius: moderateVerticalScale(20),
    backgroundColor: colors.primary,
    elevation: 2,
    height: moderateVerticalScale(30),
    width: moderateVerticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
