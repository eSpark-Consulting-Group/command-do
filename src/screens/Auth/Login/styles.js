import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../utils/fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputStyle: {
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: height * 0.005,
    paddingLeft: height * 0.015,
    borderWidth: height * 0.001,
    marginVertical: height * 0.01,
    fontFamily: Fonts.Roboto_Medium,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#11a79c',
    width: width * 0.8,
    height: height * 0.07,
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
