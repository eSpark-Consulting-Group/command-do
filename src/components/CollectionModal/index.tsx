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

export default function CollectionModal({
  closeModal,
  totAmount,
  onCollected,
  type,
  isLoading,
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

  return (
    <>
      <StatusBar backgroundColor={'#000000'} />
      <Overlay
        isVisible={true}
        overlayStyle={{
          width: '90%',
          borderRadius: 10,
          alignItems: 'center',
          backgroundColor: '#efefef',
        }}>
        <View style={{width: '100%', alignItems: 'flex-end', padding: 5}}>
          <TouchableOpacity onPress={closeModal}>
            <FA name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <MyText label={'Amount to be Pay:'} />
          <MyText
            label={'Rs. ' + totAmount}
            textStyle={{fontWeight: 'bold', fontSize: 25, color: '#444'}}
          />
        </View>
        <View
          style={{
            width: '100%',
            elevation: 2,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: colors.background,
            padding: 10,
            marginVertical: 20,
          }}>
          <MyText
            label={`How much amount is ${
              type == 'return' ? 'returned' : 'collected'
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
                fontSize: 32,
                color: '#444',
              }}
            />
            <TextInput
              ref={inputRef}
              autoFocus={true}
              keyboardType="decimal-pad"
              value={amount}
              maxLength={4}
              placeholder="0"
              cursorColor={colors.background}
              onChangeText={e => setAmount(e)}
              style={{
                fontWeight: 'bold',
                fontSize: 32,
                padding: 0,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onCollected(amount)}
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
            height: SCREEN_HEIGHT * 0.07,
            backgroundColor:
              type == 'return'
                ? amount == totAmount
                  ? colors.primary
                  : '#ccc'
                : amount >= totAmount
                ? colors.primary
                : '#ccc',
            paddingVertical: 5,
            borderRadius: 10,
          }}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={colors.text_inverse} />
          ) : (
            <MyText
              label={'Collected'}
              textStyle={{
                fontFamily: 'Poppins-Bold',
                fontSize: 25,
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
