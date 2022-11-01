import { is } from 'immer/dist/internal';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Dimensions } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { Fonts } from '../../utils/fonts';

const Color = {
  info: '#11a79c',
  warn: '#cd853f',
  success: '#32A54A',
  error: '#cc3232',
  purple: '#6441A4',
  white: 'whitesmoke',
};


const { width, height } = Dimensions.get('window');
const DropdownAlertCom = (props) => {
  const { label, data, navigation, childFunc, type, title, message, setPress } = props;

  const items = [
    {
      color: Color.info,
      type: 'info',
      message:
        'System maintenance starts at midnight. System will be down for approximately 3 hours.',
    },
    {
      color: Color.warn,
      type: 'warn',
      message:
        'Warning: Low disk space. Please add more at your earliest convenience.',
    },
    {
      color: Color.error,
      type: 'error',
      message:
        'Sorry, we are having some technical difficulties. Please try again.',
    },
    {
      color: Color.success,
      type: 'success',
      message: 'Order complete. Please check your email for further details.',
    },
    {
      color: Color.purple,
      type: 'custom',
      message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    { type: 'close', title: 'close' },
    { type: 'show', title: 'enqueue all alerts' },
    { type: 'clear', title: 'clear queue' },
  ];
  const reactNativeLogo = 'https://reactnative.dev/docs/assets/favicon.png';

  const [queueSize, setQueueSize] = useState(0);
  let dropDownAlertRef: any = useRef();

  const _onProgrammaticClose = () => {
    dropDownAlertRef.closeAction();
  };

  const _onProgrammaticClear = () => {
    dropDownAlertRef.clearQueue();
  };

  useEffect(() => {
    childFunc.current = _onSelect
  }, [])


  const _showAlertQueue = () => {
    const types = ['info', 'warn', 'error', 'success', 'custom'];
    const message =
      'Officia eu do labore incididunt consequat sunt sint ullamco cillum.';
    let count = 1;
    types.map(type => {
      dropDownAlertRef.alertWithType(
        type,
        `Alert ${count} of ${types.length}`,
        message,
      );
      count++;
    });
  };

  const _onSelect = () => {
    // const inMilliSeconds = Math.floor(Math.random() * 6000 + 1);
    // const inSeconds = (inMilliSeconds / 1000).toFixed(2);

    // _onTap()
    dropDownAlertRef.alertWithType(
      type,
      title,
      message,
    );
    _updateQueueSize();
    // onSelect(e)
  };

  const _onClose = data => {
    // _log(data);
    setPress(false)
    _updateQueueSize();
  };

  const _onCancel = data => {
    setPress(false)
    // _log(data);
    _updateQueueSize();
  };

  const _onTap = () => {
    // _log(data);
    // _updateQueueSize();
  };

  const _updateQueueSize = () => {
    setQueueSize(dropDownAlertRef.getQueueSize());
  };

  const _log = data => {
    console.log(data);
  };

  return (
    <View>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={{ backgroundColor: 'white' }}
        showCancel={true}
        onCancel={_onCancel}
        // onTap={_onTap}
        titleNumOfLines={3}
        messageNumOfLines={4}
        onClose={_onClose}
        zIndex={1}
        closeInterval={3000}
        infoColor="#11a79c"
        titleStyle={{ fontSize: height * .03,fontFamily: Fonts.Roboto_Bold,color:'white' }}
        messageStyle={{ fontSize: height * .018,fontFamily: Fonts.Roboto_Regular,color:'white' }}
        imageStyle={{width: height * .05, height: height * .05,alignSelf: 'center'}}
        cancelBtnImageStyle={{width: height * .04, height: height * .04}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Color.purple,
  },
  size: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default DropdownAlertCom;