import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {colors} from '../../theme';

import {Fonts} from '../../utils/fonts';

const {width, height} = Dimensions.get('window');
const DropdownAlertCom = props => {
  const {label, data, navigation, childFunc, type, title, message, setPress} =
    props;

  const [queueSize, setQueueSize] = useState(0);
  let dropDownAlertRef: any = useRef();

  useEffect(() => {
    childFunc.current = _onSelect;
  }, []);

  const _onSelect = () => {
    dropDownAlertRef.alertWithType(type, title, message);
    _updateQueueSize();
  };

  const _onClose = data => {
    setPress(false);
    _updateQueueSize();
  };

  const _onCancel = data => {
    setPress(false);
    _updateQueueSize();
  };

  const _updateQueueSize = () => {
    setQueueSize(dropDownAlertRef.getQueueSize());
  };

  return (
    <View>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={{backgroundColor: colors.background}}
        showCancel={true}
        onCancel={_onCancel}
        titleNumOfLines={3}
        messageNumOfLines={4}
        onClose={_onClose}
        zIndex={1}
        closeInterval={3000}
        infoColor={colors.primary}
        titleStyle={{
          fontSize: height * 0.03,
          fontFamily: Fonts.Roboto_Bold,
          color: colors.background,
        }}
        messageStyle={{
          fontSize: height * 0.018,
          fontFamily: Fonts.Roboto_Regular,
          color: colors.background,
        }}
        imageStyle={{
          width: height * 0.05,
          height: height * 0.05,
          alignSelf: 'center',
        }}
        cancelBtnImageStyle={{width: height * 0.04, height: height * 0.04}}
      />
    </View>
  );
};

export default DropdownAlertCom;
