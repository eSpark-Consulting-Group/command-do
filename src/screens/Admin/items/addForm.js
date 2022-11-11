import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  BottomButton,
  CstmDropDown,
  ImageContainer,
  MyHeader,
  MyInput,
  MySubHeader,
} from '../../../components';
import {colors} from '../../../theme';
import { uploadImage } from '../../../utils/helperFunctions';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const {mode, type} = route?.params;
  const [catToggle, setCatToggle] = useState(false);

  const handleDeleteCategory = () => {
    Alert.alert('Delete Category', 'Category will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleDeleteItem = () => {
    Alert.alert('Delete Item', 'Item will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  if (mode === 'add') {
    if (type === 'category') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <MyHeader
            title="Add Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Add Category Details" />
            <MyInput label="Name" />
            <ImageContainer />
          </ScrollView>
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
            title="Edit Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
            rightIconType="foundation"
            icon="trash"
            onPressRight={() => handleDeleteCategory()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Edit Category Details" />
            <MyInput label="Name" />
            <ImageContainer />
          </ScrollView>
          <BottomButton
            label="Edit Category"
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
            title="Edit Item"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
            rightIconType="foundation"
            icon="trash"
            onPressRight={() => handleDeleteItem()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Select Category" divider />
            <CstmDropDown
              dataSource={['Rice', 'Snacks', 'Salan', 'Beverages', 'Roti']}
              toggleValue={catToggle}
              type="category"
              handleToggle={() => setCatToggle(!catToggle)}
            />
            <MySubHeader title="Edit Item Details" divider />
            <MyInput label="Name" />
            <MyInput label="Price" />
            <ImageContainer onImageChange={(image) => {
              uploadImage(image)
              .then(fireUrl => console.log("fireUrl fireUrl", fireUrl))
            }} />
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
