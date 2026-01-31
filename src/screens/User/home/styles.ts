import { Dimensions, StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

import { colors } from '../../../theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  modalInner: {
    backgroundColor: colors.background,
    borderRadius: height * 0.005,
    zIndex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateVerticalScale(10),
  },
  btnIcon: {
    paddingRight: height * 0.01,
    alignSelf: 'center',
    top: 1,
  },
  headerContainer: {
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.015,
    marginTop: moderateVerticalScale(5),
  },
  headerCenterComponentStyle: { flexDirection: 'row' },
  greetingMsgContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  remainingAmountAlertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: moderateVerticalScale(15),
    backgroundColor: '#dff2e4',
    width: width * 0.9,
    paddingVertical: 5,
  },
  remainingAmountText: { justifyContent: 'center', textAlign: 'center' },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginLeft: 15,
  },
  categoryButton: {
    elevation: moderateVerticalScale(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(4),
    borderColor: '#00000030',
    marginHorizontal: moderateVerticalScale(4),
    borderRadius: moderateVerticalScale(7),
    marginVertical: moderateVerticalScale(10),
  },
  categoryImage: {
    height: moderateVerticalScale(35),
    width: moderateVerticalScale(35),
    borderRadius: moderateVerticalScale(35),
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
  },
  cartContainerStyle: {
    position: 'absolute',
    bottom: height * 0.02,
    right: height * 0.015,
    width: moderateVerticalScale(55),
    height: moderateVerticalScale(55),
    borderRadius: moderateVerticalScale(55),
    backgroundColor: colors?.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: moderateVerticalScale(3),
  },
  cartAmountStyle: {
    height: moderateVerticalScale(25),
    width: moderateVerticalScale(25),
    backgroundColor: colors.background,
    borderRadius: moderateVerticalScale(40),
    position: 'absolute',
    right: moderateVerticalScale(-5),
    top: moderateVerticalScale(-5),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateVerticalScale(3),
  },
  cartButtonStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: moderateVerticalScale(55),
    backgroundColor: colors?.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountStyle: {
    position: 'absolute',
    right: moderateVerticalScale(14),
    borderWidth: moderateVerticalScale(2),
    borderColor: colors.background,
    borderRadius: moderateVerticalScale(30),
    height: moderateVerticalScale(28),
    width: moderateVerticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
