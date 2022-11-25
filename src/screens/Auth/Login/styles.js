import {Dimensions, StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';

const styles = StyleSheet.create({
  inputStyle: {
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
  loginButton: {
    backgroundColor: '#11a79c',
    width: SCREEN_WIDTH * 0.8,
    height: moderateVerticalScale(45),
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: SCREEN_HEIGHT * 0.003,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.8,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default styles;
