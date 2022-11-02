import React, {useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Icon} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';

import {GapView, MyCard, MyHeader, MyText, TouchRipple} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {mode} = route?.params;
  return (
    <View style={styles.container}>
      <MyHeader
        title="Order Details"
        leftIcon="arrow-back"
        onPressLeft={() => navigation.goBack()}
      />
      <MyCard cardStyle={styles.item}>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.rowSpacer}>
            <MyText label="Details" />
            <MyText label="Rider/ Harrison" textStyle={{color: 'grey'}} />
          </View>
          <GapView mode="vertical" length={8} />
          <View style={styles.rowSpacer}>
            <MyText label="2 Nov, 14:00" textStyle={{color: 'grey'}} />
            <MyText label="Order #10" textStyle={{color: 'grey'}} />
          </View>
        </View>
        <View style={styles.listHeader}>
          <MyText
            label="Order"
            textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
          />
          <MyText
            label="Quantity"
            textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
          />
        </View>
        <FlatList
          data={[
            {item: 'Chicken Biryani', qty: '3'},
            {item: 'Sada Biryani', qty: '2'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
            {item: 'Salad', qty: '1'},
          ]}
          renderItem={({item, index}) => (
            <View style={styles.listContent}>
              <MyText label={item.item} />
              <View style={{flexDirection: 'row'}}>
                <MyText label={`x ${item.qty}`} />
                <GapView mode="horizontal" length={20} />
              </View>
            </View>
          )}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.listFooter}>
          <MyText
            label="Total"
            textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
          />
          <MyText
            label={'Rs. 2000'}
            textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
          />
        </View>
      </MyCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listHeader: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContent: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#fff',
  },
  listFooter: {
    backgroundColor: colors.primary,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingTop: 10,
  },
  rowSpacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
