import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../constants';
import LineSeparater from '../LineSeparater';

export default function PurchasingListHeader() {
  return (
    <>
      <View style={styles.headerTitlesContainer}>
        <View style={styles.headerTitleContainer1}>
          <Text style={styles.headerTitle}>Done</Text>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Item</Text>
        </View>
        <View style={styles.headerTitleContainer2}>
          <Text style={styles.headerTitle}>Quantity</Text>
        </View>
        <View style={styles.headerTitleContainer2}>
          <Text style={styles.headerTitle}>Amount</Text>
        </View>
      </View>
      <LineSeparater />
    </>
  );
}

const styles = StyleSheet.create({
  headerTitlesContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.95,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    marginTop: 10,
  },
  headerTitleContainer: {
    width: '50%',
    paddingLeft: '2%',
  },
  headerTitleContainer1: {width: '13%', alignItems: 'center'},
  headerTitleContainer2: {width: '18%', alignItems: 'center'},
  headerTitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});
