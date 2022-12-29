import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import LineSeparater from '../LineSeparater';

const {width, height} = Dimensions.get('window');

export default function OrderListHeader() {
  return (
    <>
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
      <LineSeparater />
    </>
  );
}

const styles = StyleSheet.create({
  headerTitlesContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerTitleContainer: {
    width: width * 0.2,
    alignItems: 'center',
    fontSize: width * 0.04,
  },
  headerTitleContainer2: {
    width: width * 0.18,
    alignItems: 'center',
    fontSize: width * 0.04,
  },
  headerTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});
