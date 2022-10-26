import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View>
      <Text>
        {route.params.mode == 'add'
          ? route.params.class == 'category'
            ? 'Add Category'
            : 'Add Items'
          : route.params.class == 'category'
          ? 'Edit Category'
          : 'Edit Items'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
