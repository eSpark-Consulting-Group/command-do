import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Dimensions, Modal} from 'react-native';

import styles from './styles';

export default function Orders({navigation}) {
  const {width, height} = Dimensions.get('window');
  const [check, setCheck] = useState(false);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>Current Orders</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {name: 'rohail'})}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
      <View style={styles.headerTitlesContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Name</Text>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Order</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.headerTitleContainer2}>
            <Text style={styles.headerTitle}>Amount</Text>
          </View>
          <View style={styles.headerTitleContainer2}>
            <Text style={styles.headerTitle}>Status</Text>
          </View>
        </View>
      </View>
      <View style={{borderWidth: 0.5, width: '90%', marginVertical: 5}} />

      <View style={styles.cardContainer}>
        <View style={styles.cardInnerContainer}>
          <View style={styles.cardDataContainer}>
            <Text style={styles.cardDataText}>Wirad Ali</Text>
          </View>
          <View style={styles.cardDataContainer}>
            <Text style={styles.cardDataText}>2x Roti</Text>
            <Text style={styles.cardDataText}>1x Salad</Text>
            <Text style={styles.cardDataMoreText}>(tap for more)</Text>
          </View>
        </View>
        <View style={styles.cardInnerContainer}>
          <View style={styles.cardDataContainer2}>
            <Text style={styles.cardDataText}>Rs 250</Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.cardDataContainer2,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#11a79c',
              backgroundColor: '#11a79c',
            }}>
            <Text style={{...styles.cardDataText, color: '#fff'}}>Paid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
