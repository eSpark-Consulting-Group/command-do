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
  const {mode, userDetails} = route?.params;

  const renderDayOrder = () => {
    return (
      <>
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
              <MyText label="Dated: 2 Nov, 14:00" textStyle={{color: 'grey'}} />
              <MyText label="Order #10" textStyle={{color: 'grey'}} />
            </View>
          </View>
          <View style={styles.listHeader}>
            <MyText
              label="Order"
              size={'subHeading'}
              textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
            />
            <MyText
              label="Quantity"
              size={'subHeading'}
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
                <MyText label={item.item} size={18} />
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MyText label={`x ${item.qty}`} size={18} />
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
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 2000'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>
          <View style={styles.listFooter}>
            <MyText
              label="Recieved"
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 2250'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>
          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.listFooter}>
            <MyText
              label="Returned"
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 250'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>
        </MyCard>
      </>
    );
  };

  const renderUserOrder = () => {
    return (
      <>
        <MyHeader
          title="Order Details"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
        />
        <MyCard cardStyle={styles.item}>
          <View style={{paddingHorizontal: 10}}>
            <View style={styles.rowSpacer}>
              <MyText label={userDetails?.label} />
              <MyText label="Rider/ Harrison" textStyle={{color: 'grey'}} />
            </View>
            <GapView mode="vertical" length={8} />
            <View style={styles.rowSpacer}>
              <MyText label="Dated: 2 Nov, 14:00" textStyle={{color: 'grey'}} />
              <MyText label="Order #10" textStyle={{color: 'grey'}} />
            </View>
          </View>
          <View style={styles.listHeader}>
            <MyText
              label="Order"
              size={'subHeading'}
              textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
            />
            <MyText
              label="Quantity"
              size={'subHeading'}
              textStyle={{color: colors.text_inverse, fontWeight: 'bold'}}
            />
          </View>
          <FlatList
            data={[
              {item: 'Bhatti Naan', qty: '3'},
              {item: 'Salad', qty: '1'},
              {item: 'Pepsi (200ml)', qty: '1'},
            ]}
            renderItem={({item, index}) => (
              <View style={styles.listContent}>
                <MyText label={item.item} size={18} />
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MyText label={`x ${item.qty}`} size={18} />
                </View>
              </View>
            )}
          />
          <View style={styles.listFooter}>
            <MyText
              label="Paid"
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 500'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>

          <View style={styles.listFooter}>
            <MyText
              label="Total"
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 200'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>
          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.listFooter}>
            <MyText
              label="Money Returned"
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
            <MyText
              label={'Rs. 300'}
              size={'subHeading'}
              textStyle={{fontWeight: 'bold', color: colors.text_inverse}}
            />
          </View>
        </MyCard>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {mode == 'date' ? renderDayOrder() : renderUserOrder()}
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
