import React, {useState} from 'react';
import {
  LayoutAnimation,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

import {
  CustomizeModal,
  GapView,
  MyCard,
  MyHeader,
  MyText,
  TouchRipple,
} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';

export default function OrdersList() {
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState(false);

  const isModalVisible = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setIsModal(!isModal);
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
        sections={[
          {
            title: '31 October 2022',
            data: [{rider: 'Harison', orders: 36, amount: 2000}],
          },
          {
            title: '30 October 2022',
            data: [{rider: 'Harison', orders: 31, amount: 1500}],
          },
          {
            title: '29 October 2022',
            data: [{rider: 'Harison', orders: 32, amount: 1000}],
          },
        ]}
        renderItem={({item}) => (
          <MyCard cardStyle={styles.item}>
            <TouchRipple
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
              darkRipple
              onPress={() =>
                navigation.navigate('Order_Details', {mode: 'date'})
              }>
              <View>
                <MyText label="Rider" textStyle={{textAlign: 'center'}} />
                <MyText label={item.rider} textStyle={{textAlign: 'center'}} />
              </View>
              <View>
                <MyText
                  label="Orders Placed"
                  textStyle={{textAlign: 'center'}}
                />
                <MyText label={item.orders} textStyle={{textAlign: 'center'}} />
              </View>
              <View>
                <MyText
                  label="Lunch Amount"
                  textStyle={{textAlign: 'center'}}
                />
                <MyText label={item.amount} textStyle={{textAlign: 'center'}} />
              </View>
            </TouchRipple>
          </MyCard>
        )}
        SectionSeparatorComponent={() => <GapView mode="vertical" length={2} />}
        renderSectionHeader={({section}) => (
          <MyText textStyle={styles.sectionHeader} label={section.title} />
        )}
        keyExtractor={(item, index) => index}
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
