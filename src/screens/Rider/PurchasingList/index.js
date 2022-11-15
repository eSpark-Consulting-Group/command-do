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

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {
  MyHeader,
  MyText,
  PurchasingListHeader,
  PurchasingOrderCard,
} from '../../../components';
import {colors} from '../../../theme';
import {pdfHtml} from '../../../utils/purchasingpdf';
import {orders} from '../../../utils/data';

let arr = [
  {check: false},
  {check: false},
  {check: false},
  {check: false},
  {check: false},
];

export default function PurchasingList({navigation}) {
  const [filePath, setFilePath] = useState('');
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState([
    {check: false},
    {check: false},
    {check: false},
    {check: false},
    {check: false},
  ]);

  const fileName = 'PurchasingList';

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
        // {
        //   item: {
        //     name: 'Chicken Biryani',
        //     id: 1,
        //   },
        //   amount: 170,
        //   quantity: 0,
        //   itemId: 2,
        // },
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
            name: 'Chana Pulao',
            id: 2,
          },
          amount: 120,
          quantity: 2,
          itemId: 2,
        },
        // {
        //   item: {
        //     name: 'Sada Biryani',
        //     id: 3,
        //   },
        //   amount: 130,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Sada Pulao',
        //     id: 3,
        //   },
        //   amount: 130,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Karahi',
        //     id: 3,
        //   },
        //   amount: 250,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Daal Chana Fry',
            id: 3,
          },
          amount: 120,
          quantity: 1,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'Daal Mash Fry',
        //     id: 3,
        //   },
        //   amount: 140,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Raita',
            id: 3,
          },
          amount: 25,
          quantity: 3,
          itemId: 3,
        },
        {
          item: {
            name: 'Dahi(Rs. 70)',
            id: 3,
          },
          amount: 70,
          quantity: 1,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'Salad',
        //     id: 3,
        //   },
        //   amount: 20,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Kebab',
            id: 3,
          },
          amount: 40,
          quantity: 8,
          itemId: 3,
        },
        {
          item: {
            name: 'Naan',
            id: 3,
          },
          amount: 20,
          quantity: 4,
          itemId: 3,
        },
        {
          item: {
            name: 'Chapati',
            id: 3,
          },
          amount: 15,
          quantity: 9,
          itemId: 3,
        },
        {
          item: {
            name: 'Bhatti Naan',
            id: 3,
          },
          amount: 17,
          quantity: 6,
          itemId: 3,
        },
        {
          item: {
            name: 'Bhatti Chapati',
            id: 3,
          },
          amount: 17,
          quantity: 17,
          itemId: 3,
        },
        {
          item: {
            name: 'Andy Wala Burger',
            id: 3,
          },
          amount: 110,
          quantity: 1,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'French Fries',
        //     id: 3,
        //   },
        //   amount: 50,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Chocolate Sandwich(Rs. 30 Half roll) ',
        //     id: 3,
        //   },
        //   amount: 30,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Prince biscuit(Rs. 40)',
            id: 3,
          },
          amount: 40,
          quantity: 3,
          itemId: 3,
        },
        {
          item: {
            name: 'Chocolatto (Rs. 30)',
            id: 3,
          },
          amount: 30,
          quantity: 1,
          itemId: 3,
        },
        {
          item: {
            name: 'Lays French(Rs .40)',
            id: 3,
          },
          amount: 40,
          quantity: 1,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'Lays Salt(Rs .40)',
        //     id: 3,
        //   },
        //   amount: 40,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Wavy bar.b.q(Rs .40)',
            id: 3,
          },
          amount: 40,
          quantity: 1,
          itemId: 3,
        },
        {
          item: {
            name: 'Slanty Red (Rs .50)',
            id: 3,
          },
          amount: 50,
          quantity: 1,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'Cheetos(Rs. 30)',
        //     id: 3,
        //   },
        //   amount: 30,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Slice juice bottle(Rs. 70)',
        //     id: 3,
        //   },
        //   amount: 70,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Slice mini box(Rs. 40)',
        //     id: 3,
        //   },
        //   amount: 40,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Cloud 9 Chocolate(Rs. 10)',
            id: 3,
          },
          amount: 10,
          quantity: 2,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: 'Yums(Rs. 10)',
        //     id: 3,
        //   },
        //   amount: 10,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Fanty toffee(Rs. 2)',
        //     id: 3,
        //   },
        //   amount: 2,
        //   quantity: 0,
        //   itemId: 3,
        // },
        // {
        //   item: {
        //     name: 'Mentos(Rs. 100)',
        //     id: 3,
        //   },
        //   amount: 100,
        //   quantity: 0,
        //   itemId: 3,
        // },
        {
          item: {
            name: 'Strawberry Shake',
            id: 3,
          },
          amount: 60,
          quantity: 1,
          itemId: 3,
        },
        {
          item: {
            name: 'Banana Khajoor Shake',
            id: 3,
          },
          amount: 80,
          quantity: 5,
          itemId: 3,
        },
        // {
        //   item: {
        //     name: '7UP 500ml',
        //     id: 3,
        //   },
        //   amount: 70,
        //   quantity: 0,
        //   itemId: 3,
        // },
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
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffffff'}}>
      <MyHeader
        title="Purchasing List"
        titleStyle={{fontFamily: 'Poppins-Bold'}}
      />
      {/* <View
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
      </View> */}
      <PurchasingListHeader
        checked={!check.some(item => item.check == false)}
        onAllCheck={val => {
          check.map((item, index) => {
            let update = [...check];
            console.log('Val', !val);
            update[index].check = !val;
            setCheck(update);
          });
          // if (check.some(item => item.check == false)) {
          //   check.map((item, index) => {
          //     let update = [...check];
          //     update[index].check = true;

          //     setCheck(update);
          //   });
          // } else {
          //   check.map((item, index) => {
          //     let update = [...check];
          //     update[index].check = false;
          //     setCheck(update);
          //   });
          // }
        }}
      />
      <FlatList
        data={check}
        renderItem={({item, index}) => (
          <PurchasingOrderCard
            itemName="Chicken Biryani"
            quantity={2}
            totalAmount={3500}
            checked={item.check}
            onCheck={() => {
              let update = [...check];
              update[index].check = !update[index].check;
              setCheck(update);
            }}
          />
        )}
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
