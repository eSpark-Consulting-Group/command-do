import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function AdminNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Items" component={HomeScreen} />
      <Tab.Screen name="Orders" component={SettingsScreen} />
      <Tab.Screen name="Users" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
