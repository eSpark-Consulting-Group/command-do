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
import {useNavigation, useRoute} from '@react-navigation/native';

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
import useUpdateEffect from '../../utils/hooks/useUpdateEffect';

export default function OrdersList() {
  const navigation = useNavigation();
  const route = useRoute();
  const condition =
    route?.params?.filterInfo?.userInfo === undefined ||
    route?.params?.filterInfo?.userInfo === null;
  const [isModal, setIsModal] = useState(false);

  useUpdateEffect(() => {
    if (route.params !== undefined) {
      console.log('qqqqqq', route.params);
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
          onPress={() => navigation.navigate('Order_Details', {mode: 'date'})}>
          <View>
            <MyText
              label="Rider"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText label={item.rider} textStyle={{textAlign: 'center'}} />
          </View>
          <View>
            <MyText
              label="Orders Placed"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText label={item.orders} textStyle={{textAlign: 'center'}} />
          </View>
          <View>
            <MyText
              label="Lunch Amount"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <MyText label={item.amount} textStyle={{textAlign: 'center'}} />
          </View>
        </TouchRipple>
      </MyCard>
    );
  };

  const RenderUserwise = ({item}) => {
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
            <MyText label={item.user.name} textStyle={{textAlign: 'center'}} />
          </View>
          <View>
            <MyText
              label="Paid/Lunch"
              textStyle={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <View style={{flexDirection: 'row'}}>
              <MyText
                label={`Rs. ${item.user.paidAmount}`}
                textStyle={{textAlign: 'center'}}
              />
              <MyText label={`/`} textStyle={{textAlign: 'center'}} />
              <MyText
                label={`${item.user.lunchAmount}`}
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
        sections={[
          {
            title: '31 October 2022',
            data: [
              {
                rider: 'Harison',
                orders: 36,
                amount: 2000,
                user: {name: 'Wirad Ali', lunchAmount: 200, paidAmount: 500},
              },
            ],
          },
          {
            title: '30 October 2022',
            data: [
              {
                rider: 'Harison',
                orders: 31,
                amount: 1500,
                user: {name: 'Faraz Uddin', lunchAmount: 500, paidAmount: 500},
              },
            ],
          },
          {
            title: '29 October 2022',
            data: [
              {
                rider: 'Harison',
                orders: 32,
                amount: 1000,
                user: {
                  name: 'Mudassir Ali',
                  lunchAmount: 250,
                  paidAmount: 1000,
                },
              },
            ],
          },
        ]}
        renderItem={({item}) =>
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
