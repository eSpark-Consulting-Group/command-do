import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Overlay} from '@rneui/themed';
import FA from 'react-native-vector-icons/FontAwesome';

import MyText from '../Text';
import {colors} from '../../theme';
import {SCREEN_HEIGHT} from '../../constants';
import {moderateVerticalScale} from 'react-native-size-matters';

export default function NoInternetModal({isVisible}) {
  const [amount, setAmount] = useState('');

  const inputRef: any = useRef();
  const onFocusHandler = () => {
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 20);
  };

  useEffect(() => {
    onFocusHandler();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#000000'} />
      <Overlay
        animationType="fade"
        isVisible={isVisible}
        overlayStyle={{
          width: '90%',
          borderRadius: moderateVerticalScale(10),
          alignItems: 'center',
          backgroundColor: '#efefef',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            padding: 5,
          }}>
          {/* <TouchableOpacity onPress={closeModal}>
            <FA name="close" size={moderateVerticalScale(25)} />
          </TouchableOpacity> */}
          <MyText
            textStyle={{fontFamily: 'Poppins-Bold', color: colors.primary}}
            size={'subHeading'}
            label={'Whoops!!'}
          />
          {/* <TouchableOpacity onPress={closeModal}>
            <FA name="refresh" size={moderateVerticalScale(25)} />
          </TouchableOpacity> */}
        </View>
        <View style={{alignItems: 'center', marginVertical: 5}}>
          <MyText label={'Slow or no internet connection'} />
          <MyText label={'Please check your internet connection'} />
        </View>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({});
