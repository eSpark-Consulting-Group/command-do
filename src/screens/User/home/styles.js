import {Dimensions, StyleSheet} from 'react-native';
import { colors } from '../../../theme';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#00000070',
    position: 'absolute',
    zIndex: 1,
  },
  modalInner: {
    height: height * 0.24,
    // width: width * 0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: height * 0.005,
    zIndex: 1,
    top: height * 0.035,
    left: height * 0.03,
    elevation: height * 0.003,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.01,
    borderBottomWidth: height * 0.0005,
    borderBottomColor: '#00000050',
  },
  btnIcon: {
    paddingRight: height * 0.01,
  },
  headerContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.015,
  },
  headerCenterComponentStyle: {flexDirection: 'row'},
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 15,
  },
  categoryImage: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: height * 0.05,
    marginRight: 10,
  },
  cartContainerStyle: {
    position: 'absolute',
    bottom: height * 0.02,
    right: height * 0.015,
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: height * 0.1,
    backgroundColor: colors?.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: height * 0.003,
  },
  cartAmountStyle: {
    height: height * 0.038,
    width: height * 0.038,
    backgroundColor: '#fff',
    borderRadius: height * 1,
    position: 'absolute',
    right: height * -0.008,
    top: height * -0.008,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: height * 0.005,
  },
  cartButtonStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.08,
    backgroundColor: colors?.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: height * 0.003,
  },
  cartCountStyle: {
    position: 'absolute',
    right: height * 0.02,
    borderWidth: height * 0.002,
    borderColor: 'white',
    borderRadius: height * 1,
    height: height * 0.04,
    width: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
