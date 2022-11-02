import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  InputAccessoryViewProps,
  NativeMethods,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Overlay} from '@rneui/themed';
import FA from 'react-native-vector-icons/FontAwesome';
import MyText from '../Text';
import {colors} from '../../theme';

export default function CollectionModal({closeModal, totAmount, onCollected}) {
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
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 20,
        }}>
        <MyText label={'How much amount is collected?'} />
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
            cursorColor={'#fff'}
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
        onPress={onCollected}
        disabled={amount >= totAmount ? false : true}
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: amount >= totAmount ? colors.primary : '#ccc',
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <MyText
          label={'Collected'}
          textStyle={{
            fontFamily: 'Poppins-Bold',
            fontSize: 25,
            color: colors.text_inverse,
          }}
        />
      </TouchableOpacity>
    </Overlay>
  );
}

const styles = StyleSheet.create({});
