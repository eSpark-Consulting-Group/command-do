import { StyleSheet, Dimensions } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

import { colors } from '../../../theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  topCurveView: {
    backgroundColor: colors.background,
    width: height * 3.3,
    height: height * 3.3,
    borderRadius: height * 4,
    position: 'absolute',
    bottom: height * 0.855,
    left: height * -1.36,
    zIndex: 1,
  },
  mainContent: {
    height: height * 0.12,
    width: width * 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifStyle: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: height * 0.015,
    resizeMode: 'cover',
  },
  bottomCurveView: {
    backgroundColor: '#61C2BC',
    width: height * 3.3,
    height: height * 3.3,
    borderRadius: height * 4,
    position: 'absolute',
    bottom: height * 0.1,
    left: height * -1.36,
  },
  orderDoneGif: {
    height: height * 0.45,
    width: height * 0.6,
    borderRadius: height * 0.015,
    resizeMode: 'cover',
    position: 'relative',
    right: height * 0.06,
  },
  completeOrderTextContainer: {
    height: height * 0.3,
    width: width * 1,
    zIndex: 1,
    alignItems: 'center',
  },
  backToHomeButton: {
    backgroundColor: colors.background,
    height: moderateVerticalScale(40),
    borderRadius: moderateVerticalScale(5),
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.03,
    elevation: moderateVerticalScale(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateVerticalScale(1),
    },
    shadowOpacity: moderateVerticalScale(0.20),
    shadowRadius: moderateVerticalScale(1.41),
  },
});
