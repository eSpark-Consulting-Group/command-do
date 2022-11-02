import {StyleSheet, View} from 'react-native';
import React from 'react';

export default function LineSeparater() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {borderWidth: 0.5, width: '90%', marginVertical: 5},
});
