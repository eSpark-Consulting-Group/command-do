import React, {useState} from 'react';
import {ActivityIndicator, SectionList, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  GapView,
  MyCard,
  MyHeader,
  MyText,
  TouchRipple,
} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';
import useUpdateEffect from '../../../utils/hooks/useUpdateEffect';
import {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {ALL_ORDERS, ORDERS_BY_DATE} from '../../../graphQL/query/orders.query';
import {getOrdersByDate} from '../../../features/adminOrders/adminOrderSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function OrdersList() {
  const navigation = useNavigation();
  const route = useRoute();
  const [GetOrdersByDate, {loading: loadingByDate}] =
    useLazyQuery(ORDERS_BY_DATE);
  const [GetAllUserOrders, {loading}] = useLazyQuery(ALL_ORDERS);
  const dispatch = useDispatch();
  const ordersByDate = useSelector(store => store.adminOrder.adminOrders);
  const condition =
    route?.params?.filterInfo?.userInfo === undefined ||
    route?.params?.filterInfo?.userInfo === null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async dateRange => {
    const currDate = new Date().setHours(0);
    console.log('Date', new Date(currDate));
    const orders = await GetOrdersByDate({
      variables: dateRange ?? {
        startDate: currDate,
        endDate: new Date(),
      },
    });
    dispatch(getOrdersByDate(orders?.data?.getOrderOverviewByDate?.data));
    // console.log('orders.data', orders.data.getOrderOverviewByDate.data);
    console.log('ordersByDate', ordersByDate);
  };

  const fetchUserOrders = async userId => {
    console.log('User ID', userId);
    const orders = await GetAllUserOrders({
      variables: {
        getOrderInput: {
          userId: userId,
        },
      },
    });
    console.log('orders.data', orders.data.getAllOrders.data);
    dispatch(getOrdersByDate(orders.data.getAllOrders.data));
    // console.log('ordersByDate', ordersByDate);
  };

  useUpdateEffect(() => {
    if (route.params !== undefined) {
      console.log('qqqqqq', route.params.filterInfo);
      condition
        ? fetchOrders(route.params.filterInfo.dateRange)
        : fetchUserOrders(route.params.filterInfo.userInfo);
    }
  }, [route.params]);

  const RenderDatewise = ({item}) => {
    return (
      <MyCard cardStyle={styles.item}>
        <TouchRipple
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}
          darkRipple
          onPress={() =>
            navigation.navigate('Order_Details', {
              mode: 'date',
              Date: item.createdAt,
            })
          }>
          <View>
            <MyText
              label="Rider"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText
              label={item.rider ? item.rider?.firstName : 'In Progress'}
              textStyle={{textAlign: 'center'}}
            />
          </View>
          <View>
            <MyText
              label="Orders Placed"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText
              label={item.totalOrders}
              textStyle={{textAlign: 'center'}}
            />
          </View>
          <View>
            <MyText
              label="Lunch Amount"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText
              label={item.totalAmount}
              textStyle={{textAlign: 'center'}}
            />
          </View>
        </TouchRipple>
      </MyCard>
    );
  };

  const RenderUserwise = ({item}) => {
    console.log('Item', item?.User?.firstName);
    return (
      <MyCard cardStyle={styles.item}>
        <TouchRipple
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}
          darkRipple
          onPress={() =>
            navigation.navigate('Order_Details', {
              mode: condition ? 'date' : 'user',
              userDetails: route?.params?.filterInfo?.userInfo,
            })
          }>
          <View>
            <MyText
              label="Order Holder"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText
              label={item?.User?.firstName}
              textStyle={{textAlign: 'center'}}
            />
          </View>
          <View>
            <MyText
              label="Paid/Lunch"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <View style={{flexDirection: 'row'}}>
              <MyText
                label={`Rs. ${item?.paidAmount}`}
                textStyle={{textAlign: 'center'}}
              />
              <MyText label={`/`} textStyle={{textAlign: 'center'}} />
              <MyText
                label={`${item?.totalAmount}`}
                textStyle={{textAlign: 'center'}}
              />
            </View>
          </View>
        </TouchRipple>
      </MyCard>
    );
  };

  return (
    <View style={styles.container}>
      <MyHeader
        title="All Orders"
        icon="filter"
        rightIconType="antdesign"
        onPressRight={() => {
          navigation.navigate('Filters');
        }}
      />
      <GapView length={4} mode="vertical" />
      <SectionList
        sections={ordersByDate}
        renderItem={({item}) =>
          // <RenderDatewise item={item} />
          condition ? (
            <RenderDatewise item={item} />
          ) : (
            <RenderUserwise item={item} />
          )
        }
        SectionSeparatorComponent={() => <GapView mode="vertical" length={2} />}
        renderSectionHeader={({section}) => (
          <MyText textStyle={styles.sectionHeader} label={section.title} />
        )}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={
          loadingByDate || loading ? (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: SCREEN_HEIGHT * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText label={'No Orders'} size={'subHeading'} />
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    backgroundColor: colors.primary,
    padding: 8,
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
  },
  outlineBtn: {
    flexDirection: 'row',
    width: '40%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 100,
    elevation: 2,
    paddingHorizontal: 10,
  },
  modalInner: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: SCREEN_HEIGHT * 0.005,
    zIndex: 1,
    top: SCREEN_HEIGHT * 0.13,
    left: SCREEN_HEIGHT * 0.19,
    elevation: SCREEN_HEIGHT * 0.003,
    justifyContent: 'center',
  },
  btnIcon: {
    paddingRight: SCREEN_HEIGHT * 0.01,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text_inverse,
    backgroundColor: colors.primary,
    elevation: 1,
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 2,
  },
});
