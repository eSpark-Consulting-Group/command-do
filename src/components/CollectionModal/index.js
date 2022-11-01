import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Overlay} from '@rneui/themed';
import FA from 'react-native-vector-icons/FontAwesome';

export default function CollectionModal({closeModal, totAmount, onCollected}) {
  const [amount, setAmount] = useState('');

  const inputRef = useRef(null);
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
        <Text>Amount to be Pay:</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25, color: '#444'}}>
          RS {totAmount}
        </Text>
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
        <Text>How much amount is collected?</Text>
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
          backgroundColor: amount >= totAmount ? '#11a79c' : '#ccc',
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: '700', fontSize: 25, color: '#fff'}}>
          Collected
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
}

const styles = StyleSheet.create({});
