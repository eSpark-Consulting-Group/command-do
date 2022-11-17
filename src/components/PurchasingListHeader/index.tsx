import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import LineSeparater from '../LineSeparater';
import {CheckBox} from '@rneui/themed';
import {colors} from '../../theme';

export default function PurchasingListHeader({}: // onAllCheck,
// checked,
{
  // onAllCheck: (val: boolean) => void;
  // checked: boolean;
}) {
  // const updateAllCheck = () => {
  //   onAllCheck(checked);
  // };

  return (
    <>
      <View style={styles.headerTitlesContainer}>
        {/* <View style={styles.headerTitleContainer1}>
          <CheckBox
            checked={checked}
            onPress={updateAllCheck}
            checkedColor={colors.primary}
            containerStyle={{height: SCREEN_HEIGHT * 0.06}}
          />
        </View> */}
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
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    marginTop: 5,
  },
  headerTitleContainer: {
    width: '48%',
    paddingLeft: '2%',
  },
  headerTitleContainer1: {width: '12%', alignItems: 'center'},
  headerTitleContainer2: {width: '25%', alignItems: 'center'},
  headerTitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});
