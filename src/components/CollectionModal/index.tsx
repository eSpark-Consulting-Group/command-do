import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Overlay } from '@rneui/themed';
import FA from 'react-native-vector-icons/FontAwesome';

import MyText from '../Text';
import { colors } from '../../theme';
import { SCREEN_HEIGHT } from '../../constants';
import { moderateVerticalScale } from 'react-native-size-matters';

export default function CollectionModal({
  closeModal,
  totAmount,
  onCollected,
  type,
  isLoading,
  isVisible,
}) {
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

  const onCollecion = (amount: string) => {
    onCollected(amount);
    setAmount('');
  };

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
        <View style={{ width: '100%', alignItems: 'flex-end', padding: 5 }}>
          <TouchableOpacity onPress={closeModal}>
            <FA name="close" size={moderateVerticalScale(25)} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <MyText label={`Amount to be ${type == 'return' ? 'Return' : 'Pay'
            }:`} />
          <MyText
            label={'Rs. ' + totAmount}
            textStyle={{
              fontWeight: 'bold',
              fontSize: moderateVerticalScale(25),
              color: '#444',
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            elevation: moderateVerticalScale(2),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: moderateVerticalScale(1),
            },
            shadowOpacity: moderateVerticalScale(0.20),
            shadowRadius: moderateVerticalScale(1.41),
            borderRadius: moderateVerticalScale(10),
            alignItems: 'center',
            backgroundColor: colors.background,
            padding: 10,
            marginVertical: 20,
          }}>
          <MyText
            label={`How much amount is ${type == 'return' ? 'returned' : 'collected'
              }?`}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              children={'Rs. '}
              style={{
                fontWeight: 'bold',
                fontSize: moderateVerticalScale(32),
                color: '#444',
              }}
            />
            <TextInput
              ref={inputRef}
              autoFocus={true}
              keyboardType="numeric"
              value={amount}
              maxLength={4}
              placeholder="0"
              cursorColor={colors.background}
              onChangeText={e => {
                if (e == '0') {
                  return;
                }
                setAmount(e.replace(/[^0-9]+/g, ''));
              }}
              style={{
                fontWeight: 'bold',
                fontSize: moderateVerticalScale(32),
                padding: 0,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onCollecion(amount)}
          disabled={
            type == 'return'
              ? amount == totAmount
                ? false
                : true
              : amount >= totAmount
                ? false
                : true
          }
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              type == 'return'
                ? amount == totAmount
                  ? colors.primary
                  : '#ccc'
                : amount >= totAmount
                  ? colors.primary
                  : '#ccc',
            paddingVertical: moderateVerticalScale(5),
            borderRadius: 10,
          }}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={colors.text_inverse} />
          ) : (
            <MyText
              label={type == 'return' ? 'Returned' : 'Collected'}
              textStyle={{
                fontFamily: 'Poppins-Bold',
                fontSize: moderateVerticalScale(25),
                color: colors.text_inverse,
              }}
            />
          )}
        </TouchableOpacity>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({});
