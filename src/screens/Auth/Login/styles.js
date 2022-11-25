import {Dimensions, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';

const styles = StyleSheet.create({
  inputStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.005,
    borderWidth: SCREEN_HEIGHT * 0.001,
    marginVertical: SCREEN_HEIGHT * 0.01,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: '#11a79c',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.005,
    paddingLeft: SCREEN_HEIGHT * 0.015,
    marginVertical: SCREEN_HEIGHT * 0.01,
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
