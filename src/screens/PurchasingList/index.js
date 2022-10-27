import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../constants';
import {
  LineSeparater,
  MyText,
  PurchasingListHeader,
  PurchasingOrderCard,
} from '../../components';
import {colors} from '../../theme';
import {Icon} from '@rneui/themed';

export default function PurchasingList({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: '#fafafa',
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
        style={{
          width: '95%',
          // position: 'absolute',
          // bottom: '0%',
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
