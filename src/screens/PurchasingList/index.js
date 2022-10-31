import React, {useState} from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Icon} from '@rneui/themed';

import {SCREEN_WIDTH} from '../../constants';
import {
  LineSeparater,
  MyText,
  PurchasingListHeader,
  PurchasingOrderCard,
} from '../../components';
import {colors} from '../../theme';
import {pdfHtml} from '../../utils/purchasingpdf';

export default function PurchasingList({navigation}) {
  const [filePath, setFilePath] = useState('');

  const fileName = 'PurchasingList';
  const arr = Array(16).fill('a');

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
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: pdfHtml(arr),
        //File Name
        fileName: fileName,
        //File directory
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
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
      <PurchasingListHeader />
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
        <PurchasingOrderCard
          itemName="Chicken Biryani"
          qty={2}
          totalAmount={350}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={createPDF}
        style={{
          width: '95%',
          alignItems: 'center',
          backgroundColor: '#11a79c',
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: '600', fontSize: 22, color: '#fff'}}>
          Generate PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
