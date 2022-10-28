import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchBar} from '../../components';

export default function SearchScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SearchBar
        leftIcon="arrow-back"
        icon="close-circle"
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => console.log('Hello world')}
      />
      <View style={styles.listContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {},
});
