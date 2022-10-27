import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Overlay} from '@rneui/themed';
import FA from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {
  CollectionModal,
  LineSeparater,
  MyText,
  OrderCard,
  OrderListHeader,
} from '../../components';

export default function Orders({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');

  const openOverlay = () => {
    setShowModal(true);
  };
  const closeOverlay = () => {
    setShowModal(false);
    setAmount('');
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {name: 'rohail'})}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
      <OrderListHeader />
      <OrderCard
        name={'Wirad Ali'}
        amount={200}
        order={[
          {
            item: 'Chicken Biryani',
            qty: 2,
          },
          {
            item: 'Salad',
            qty: 1,
          },
        ]}
        paid={false}
        onCollect={openOverlay}
      />
      {showModal && (
        <CollectionModal isVisible={showModal} closeModal={closeOverlay} />
      )}
      {/* <Overlay
        isVisible={showModal}
        // statusBarTranslucent
        overlayStyle={{
          width: '90%',
          borderRadius: 10,
          alignItems: 'center',
          backgroundColor: '#efefef',
        }}>
        <View style={{width: '100%', alignItems: 'flex-end', padding: 5}}>
          <TouchableOpacity onPress={closeOverlay}>
            <FA name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text>Amount to be Pay:</Text>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: '#444'}}>
            RS 250
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
          disabled={amount == '' ? true : false}
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: amount == '' ? '#ccc' : '#11a79c',
            paddingVertical: 5,
            borderRadius: 10,
          }}
          onPress={closeOverlay}>
          <Text style={{fontWeight: '700', fontSize: 25, color: '#fff'}}>
            Collected
          </Text>
        </TouchableOpacity>
      </Overlay> */}
    </View>
  );
}
