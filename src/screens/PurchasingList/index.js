import React, {useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Icon, SpeedDial} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {
  LineSeparater,
  MyText,
  PurchasingListHeader,
  PurchasingOrderCard,
} from '../../components';
import {colors} from '../../theme';
import {pdfHtml} from '../../utils/purchasingpdf';
import {orders} from '../../utils/data';

export default function PurchasingList({navigation}) {
  const [filePath, setFilePath] = useState('');
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(false);

  const fileName = 'PurchasingList';
  const arr = Array(5).fill({check: false});

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
    let order = {
      status: true,
      message: 'Order Summary',
      totalAmount: 600,
      data: [
        {
          item: {
            name: 'Chicken Biryani',
            id: 1,
          },
          amount: 170,
          quantity: 1,
          itemId: 1,
        },
        {
          item: {
            name: 'Chicken Pulao',
            id: 2,
          },
          amount: 170,
          quantity: 1,
          itemId: 2,
        },
        {
          item: {
            name: 'Sada Biryani',
            id: 3,
          },
          amount: 260,
          quantity: 2,
          itemId: 3,
        },
      ],
    };

    let currDateTime =
      new Date().toISOString().slice(0, 10) +
      '_' +
      new Date().toLocaleTimeString().replace(/:/g, '');

    if (await isPermitted()) {
      let options = {
        //Content to print
        html: pdfHtml(order),
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
        });
        console.log(file.filePath.slice(19));
        setFilePath(file.filePath);
      } catch (error) {
        console.log('err', error);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffffff'}}>
      <View
        style={{
          width: SCREEN_WIDTH,
          padding: 10,
          paddingHorizontal: 15,
          elevation: 5,
          borderRadius: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
        }}>
        <MyText
          label={'Purchasing List'}
          size={'subHeading'}
          textStyle={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
            textAlignVertical: 'center',
            color: colors.text_inverse,
          }}
        />
        <Icon
          name="search"
          size={34}
          color={colors.text_inverse}
          containerStyle={{alignSelf: 'center'}}
        />
      </View>
      <PurchasingListHeader onAllCheck={val => setCheck(val)} />
      <FlatList
        data={arr}
        renderItem={({item, index}) => (
          <PurchasingOrderCard
            itemName="Chicken Biryani"
            qty={2}
            totalAmount={3500}
            checked={item.check}
            onCheck={val => {
              // console.log('ARR', arr, index);
              arr[index].check = val;
            }}
          />
        )}
      />
      {/* <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={3500}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={20}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
          checked={check}
          onCheck={val => setCheck(val)}
        />
      </ScrollView> */}

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
        <Text style={{fontWeight: '600', fontSize: 18}}>Total</Text>
        <Text style={{fontWeight: '600', fontSize: 18}}>Rs. 2040</Text>
      </View>
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={createPDF}
          style={{
            width: '15%',
            alignItems: 'center',
            backgroundColor: '#11a79c',
            height: SCREEN_HEIGHT * 0.08,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Icon name="print" color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MoneyReturn')}
          style={{
            width: '80%',
            alignItems: 'center',
            backgroundColor: '#11a79c',
            height: SCREEN_HEIGHT * 0.08,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontWeight: '600', fontSize: 22, color: '#fff'}}>
            Order Purchased
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
