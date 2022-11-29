import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Icon, SpeedDial} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useLazyQuery} from '@apollo/client';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {
  MyHeader,
  MyText,
  PurchasingListHeader,
  PurchasingOrderCard,
} from '../../../components';
import {colors} from '../../../theme';
import {pdfHtml} from '../../../utils/purchasingpdf';
import {
  ORDERS_PURCHASED,
  ORDERS_SUMMARY,
} from '../../../graphQL/query/orders.query';
import {toggleOrderPurchased} from '../../../features/riderOrders/riderOrderSlice';

export default function PurchasingList({navigation}) {
  const [GetOrderSummary, {loading}] = useLazyQuery(ORDERS_SUMMARY);
  const [getPurchasedOrders, {loading: loadPurchased}] =
    useLazyQuery(ORDERS_PURCHASED);
  const dispatch = useDispatch();
  const [filePath, setFilePath] = useState('');
  const [riderSummary, setRiderSummary] = useState([]);
  const [summary, setSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const fileName = 'PurchasingList';
  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async () => {
    const currDate = new Date().setUTCHours(0);
    const getOrderSummary = await GetOrderSummary({
      variables: {
        date: currDate,
      },
    });
    let orders = getOrderSummary.data.getOrderSummary.data;
    console.log('Update', getOrderSummary.data.getOrderSummary.data);
    setRiderSummary(getOrderSummary.data.getOrderSummary);
    setSummary(orders);
    let TotalAmount = 0;

    orders.map(item => {
      TotalAmount = TotalAmount + item.amount;
      console.log('ORder', item.amount);
    });
    console.log('TotalAmount', TotalAmount);
    setTotalAmount(TotalAmount);
    navigation.navigate('Purchasing_List');
  };

  const confirmPurchase = () => {
    Alert.alert('Confirm Purchase', 'Are sure to Confirm Purchase?', [
      {
        text: 'Yes',
        onPress: orderPurchased,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  const orderPurchased = async () => {
    await getPurchasedOrders();
    dispatch(toggleOrderPurchased(true));
    navigation.navigate('MoneyReturn');
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    let currDateTime =
      new Date().toISOString().slice(0, 10) +
      '_' +
      new Date().toLocaleTimeString().replace(/:/g, '');

    console.log('Summary', riderSummary);

    if (await isPermitted()) {
      let options = {
        //Content to print
        html: pdfHtml(riderSummary),
        //File Name
        fileName: fileName + currDateTime,
        //File directory
        directory: 'eSpark Lunch',
      };
      try {
        let file = await RNHTMLtoPDF.convert(options);
        showMessage({
          message: 'PDF Generated Successfully',
          description: 'to: ' + file.filePath.slice(19),
          type: 'success',
          icon: 'auto',
          autoHide: false,
        });
        console.log(file.filePath.slice(19));
        setFilePath(file.filePath);
      } catch (error) {
        console.log('err', error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <MyHeader
        title="Purchasing List"
        titleStyle={{fontFamily: 'Poppins-Bold'}}
      />
      <PurchasingListHeader />
      <FlatList
        data={summary}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <PurchasingOrderCard
            itemName={item.item.name}
            quantity={item.quantity}
            totalAmount={item.amount}
          />
        )}
        ListEmptyComponent={
          loading && (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.6,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getSummary} />
        }
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingHorizontal: 20,
          borderRadius: 10,
          borderTopWidth: 1,
          borderColor: '#00000042',
        }}>
        <MyText
          label={'Total'}
          textStyle={{fontWeight: '600', fontFamily: 'Poppins-Bold'}}
        />
        <MyText
          label={`Rs. ${totalAmount}`}
          textStyle={{fontWeight: '600', fontFamily: 'Poppins-Bold'}}
        />
      </View>
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          height: moderateVerticalScale(50),
        }}>
        <TouchableOpacity
          onPress={createPDF}
          style={{
            width: '15%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Icon
            name="print"
            size={moderateVerticalScale(30)}
            color={colors.text_inverse}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmPurchase}
          style={{
            width: '80%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          {loadPurchased ? (
            <ActivityIndicator size={'large'} color={colors.background} />
          ) : (
            <MyText
              textStyle={{
                fontFamily: 'Poppins-Bold',
                fontSize: 22,
                color: colors.text_inverse,
              }}
              label={'Order Purchased'}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
