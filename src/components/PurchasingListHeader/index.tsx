import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import LineSeparater from '../LineSeparater';
import { colors } from '../../theme';
import MyText from '../Text';

export default function PurchasingListHeader({
  onAllCheck,
  checked,
}: {
  onAllCheck: (val: boolean) => void;
  checked: boolean;
}) {
  const updateAllCheck = () => {
    onAllCheck(checked);
  };

  return (
    <>
      <View style={styles.headerTitlesContainer}>
        <View style={styles.headerTitleContainer1}>
          <CheckBox
            checked={checked}
            onPress={updateAllCheck}
            checkedColor={colors.primary}
            containerStyle={{ height: SCREEN_HEIGHT * 0.06 }}
          />
        </View>
        <View style={styles.headerTitleContainer}>
          <MyText label={'Item'} textStyle={styles.headerTitle} />
        </View>
        <View style={styles.headerTitleContainer2}>
          <MyText label={'Quantity'} textStyle={styles.headerTitle} />
        </View>
        <View style={styles.headerTitleContainer2}>
          <MyText label={'Amount'} textStyle={styles.headerTitle} />
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
    // height: SCREEN_HEIGHT * 0.05,
    alignItems: 'center',
  },
  headerTitleContainer: {
    width: '40%',
    paddingLeft: '2%',
  },
  headerTitleContainer1: { width: '12%', alignItems: 'center' },
  headerTitleContainer2: { width: '25%', alignItems: 'center' },
  headerTitle: {
    fontWeight: '600',
  },
});
