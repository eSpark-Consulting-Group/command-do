import {Dimensions, StyleSheet} from 'react-native';
import { Fonts } from '../../utils/fonts';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemImageContainer: {
    height: height * 0.72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  itemImageBackIcon: {
    height: height * 0.05,
    elevation: height * 0.003,
    width: height * 0.05,
    margin: height * 0.015,
    backgroundColor: '#fff',
    borderRadius: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numericBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: 0
  },
  removeNumericButton: {
    borderRadius: height * 1,
    backgroundColor: '#11a79c',
    elevation: height * 0.003,
    height: height * 0.05,
    width: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    height: height * 0.07,
    maxWidth: width * 0.2,
    fontFamily: Fonts.Roboto_Medium,
    color: 'black',
    fontSize: height * 0.028,
  },
  addNumericButton: {
    borderRadius: height * 1,
    backgroundColor: '#11a79c',
    elevation: 3,
    height: height * 0.05,
    width: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: height * .01
  },
  itemDetailContainer: {
    height: height * 0.25,
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'relative',
    bottom: height * 0.035,
    padding: height * 0.02,
    borderTopRightRadius: height * 0.04,
    borderTopLeftRadius: height * 0.04,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: height * 0.055,
    // backgroundColor: 'red'
  },
  noteStyle: {
    borderRadius: height * 0.005,
    padding: height * 0.03,
    borderWidth: height * 0.001,
    marginVertical: height * 0.02,
    fontFamily: Fonts.Roboto_Medium,
    color: 'black',
    fontSize: height * 0.015,
  },
  cartButtonStyle: {
    backgroundColor: '#11a79c',
    height: height * 0.06,
    borderRadius: height * 0.005,
    paddingLeft: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: height * 0.003,
  },
  cartCountStyle: {
    position: 'absolute',
    left: height * 0.01,
    borderWidth: height * 0.002,
    borderColor: 'white',
    borderRadius: height * 1,
    height: height * 0.04,
    width: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
