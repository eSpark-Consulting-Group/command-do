import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  BottomButton,
  CstmDropDown,
  GapView,
  ImageContainer,
  MyHeader,
  MyInput,
  MySubHeader,
  MyText,
} from '../../components';
import {colors} from '../../theme';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const {mode, type} = route?.params;
  const [catToggle, setCatToggle] = useState(false);

  if (mode === 'add') {
    if (type === 'category') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <MyHeader
            title="Add Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <View style={{paddingHorizontal: 10}}>
            <MySubHeader title="Add Category Details" />
            <MyInput label="Name" />
            <ImageContainer />
          </View>
          <BottomButton
            label="Add Category"
            count={0}
            totalCount={1}
            enabled={true}
            onPress={() => console.log('Done')}
          />
        </View>
      );
    }
    if (type === 'item') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <MyHeader
            title="Add Item"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Select Category" divider />
            <CstmDropDown
              dataSource={['Rice', 'Snacks', 'Salan', 'Beverages', 'Roti']}
              toggleValue={catToggle}
              type="category"
              handleToggle={() => setCatToggle(!catToggle)}
            />
            <MySubHeader title="Add Item Details" divider />
            <MyInput label="Name" />
            <MyInput label="Price" />
            <ImageContainer />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Add An Item"
              count={0}
              totalCount={2}
              enabled={false}
              onPress={() => console.log('Done')}
            />
          </View>
        </View>
      );
    }
  }
  if (mode === 'edit') {
    if (type === 'category') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <MyHeader
            title="Add Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <View style={{paddingHorizontal: 10}}>
            <MySubHeader title="Add Category Details" />
            <MyInput label="Name" />
            <ImageContainer />
          </View>
          <BottomButton
            label="Add Category"
            count={0}
            totalCount={1}
            enabled={true}
            onPress={() => console.log('Done')}
          />
        </View>
      );
    }
    if (type === 'item') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <MyHeader
            title="Add Item"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Select Category" divider />
            <CstmDropDown
              dataSource={['Rice', 'Snacks', 'Salan', 'Beverages', 'Roti']}
              toggleValue={catToggle}
              type="category"
              handleToggle={() => setCatToggle(!catToggle)}
            />
            <MySubHeader title="Add Item Details" divider />
            <MyInput label="Name" />
            <MyInput label="Price" />
            <ImageContainer />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Add An Item"
              count={0}
              totalCount={2}
              enabled={false}
              onPress={() => console.log('Done')}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
