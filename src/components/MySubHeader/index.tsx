import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyText from '../Text';
import GapView from '../GapView';
import {Divider} from '@rneui/base';

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
        <Divider orientation="horizontal" width={1} color={'#000000'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
