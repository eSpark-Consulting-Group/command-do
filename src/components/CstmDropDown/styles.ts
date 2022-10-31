import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    opacity: 0.7,
    height: 25,
  },
  dropdownLabelContainer: {
    borderWidth: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  dropdownLabelInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#fff',
  },
  dropDownText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
  },
  dropDownContainer: {
    height: moderateVerticalScale(150),
    borderRightWidth: 2,
    borderBottomWidth: 2,
    marginHorizontal: 10,
    borderLeftWidth: 2,
  },
  itemContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  itemText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
  },
});

export default styles;
