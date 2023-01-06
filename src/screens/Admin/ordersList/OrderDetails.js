import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';

import {
  GapView,
  MyCard,
  MyHeader,
  MyText,
  OverlayLoader,
} from '../../../components';
import { colors } from '../../../theme';
import {
  ALL_ORDERS,
  COLLECTED_ORDERS,
} from '../../../graphQL/query/orders.query';
import useUpdateEffect from '../../../utils/hooks/useUpdateEffect';

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode, data } = route?.params;
  const [GetAllOrders, { data: OrderData, loading: allLoading }] = useLazyQuery(
    ALL_ORDERS,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        getOrderInput: data,
      },
    },
  );
  const [
    GetCollectedOrder,
    { data: CollectedOrderData, loading: collectedLoading },
  ] = useLazyQuery(COLLECTED_ORDERS, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      getOrderInput: data,
    },
  });

  useEffect(() => {
    console.log('DATa', data);
    data.userId
      ? GetAllOrders({
          variables: {
            getOrderInput: data,
          },
        })
      : GetCollectedOrder({
          variables: data,
        });
  }, []);

  console.log('getORderData', OrderData?.getAllOrders?.data);

  const OrderDetails = !data.userId
    ? CollectedOrderData?.getCollectedOrder?.data
    : OrderData?.getAllOrders?.data[0];
  console.log('isFocused isFocused', OrderDetails, data);

  const renderDayOrder = () => {
    return (
      <>
        <MyHeader
          title="Order Details"
          leftIcon="arrow-back"
          onPressLeft={() => navigation.goBack()}
        />
        <MyCard cardStyle={styles.item}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.rowSpacer}>
              <MyText label="Details" />
              <MyText
                label={`Rider/ ${
                  OrderDetails?.Rider?.firstName ?? 'Order Not Picked'
                }`}
                textStyle={{ color: 'grey' }}
              />
            </View>
            <GapView mode="vertical" length={8} />
            <View style={styles.rowSpacer}>
              <MyText
                label={
                  'Date: ' +
                  new Date(OrderDetails?.createdAt).toString().slice(0, 15)
                }
                textStyle={{ color: 'grey' }}
              />
              <MyText
                label={`Order #${OrderDetails?.id}`}
                textStyle={{ color: 'grey' }}
              />
            </View>
          </View>
          <View style={styles.listHeader}>
            <MyText
              label="Order"
              size={'subHeading'}
              textStyle={{ color: colors.text_inverse, fontWeight: 'bold' }}
            />
            <MyText
              label="Quantity"
              size={'subHeading'}
              textStyle={{ color: colors.text_inverse, fontWeight: 'bold' }}
            />
          </View>
          <FlatList
            data={
              data.userId
                ? OrderDetails?.OrderItems
                : OrderDetails?.summary || []
            }
            renderItem={({ item, index }) => (
              <View style={styles.listContent}>
                <MyText
                  label={data.userId ? item.Item?.name : item.item?.name}
                  size={18}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MyText label={`x ${item?.quantity}`} size={18} />
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
              textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
            />
            <MyText
              label={`Rs. ${OrderDetails?.totalAmount}`}
              size={'subHeading'}
              textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
            />
          </View>
          {data.userId && (
            <>
              <View style={styles.listFooter}>
                <MyText
                  label="Recieved"
                  size={'subHeading'}
                  textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
                />
                <MyText
                  label={`Rs. ${OrderDetails?.paidAmount}`}
                  size={'subHeading'}
                  textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
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
                  textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
                />
                <MyText
                  label={`Rs. ${
                    OrderDetails?.remainingAmount > 0
                      ? OrderDetails?.remainingAmount
                      : 0
                  }`}
                  size={'subHeading'}
                  textStyle={{ fontWeight: 'bold', color: colors.text_inverse }}
                />
              </View>
            </>
          )}
        </MyCard>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <OverlayLoader show={allLoading || collectedLoading} />
      {renderDayOrder()}
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
