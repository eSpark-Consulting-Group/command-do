import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyText from '../Text';
import GapView from '../GapView';
import {Divider} from '@rneui/base';
import {colors} from '../../theme';

export default function MySubHeader({
  title,
  divider = true,
}: {
  title: string;
  divider?: boolean;
}) {
  return (
    <View style={{paddingVertical: 10}}>
      <MyText label={title} size={'subHeading'} />
      <GapView mode="vertical" />
      {divider && (
        <Divider
          orientation="horizontal"
          width={1}
          color={colors.text_normal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
