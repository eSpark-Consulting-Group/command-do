import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {MyText} from '..';
import {NotFound} from '../../assets/images';
import {SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';
import {AddToCartBtn} from '../AddToCartBtn';

const {width, height} = Dimensions.get('window');

const Cards = props => {
  const {label, data, navigation} = props;
  const cart = useSelector((store: any) => store.cart);

  const renderList = ({item: dataItem, index: dataIndex}) => {
    var cartItem = cart?.cartItems?.find(
      (value: any) => value?.id == dataItem?.id,
    );
    return (
      <View style={{opacity: 1}}>
        <Pressable
          key={dataIndex}
          style={{
            opacity: 1,
            paddingHorizontal: 10,
            paddingTop: moderateVerticalScale(10),
          }}
          onPress={() =>
            navigation.navigate('Item', {
              foodType: dataItem?.name,
              item: dataItem,
            })
          }>
          <View
            style={{
              opacity: 1,
              height: moderateVerticalScale(170),
              width: moderateVerticalScale(330),
              borderRadius: height * 0.02,
              elevation: width * 0.003,
            }}>
            <Image
              source={{uri: dataItem?.image}}
              style={{
                opacity: 1,
                borderRadius: height * 0.02,
                height: moderateVerticalScale(170),
                width: moderateVerticalScale(330),
                backgroundColor: colors.background,
              }}
            />
            {cartItem != undefined && cartItem?.quantity != 0 && (
              <View
                style={{
                  opacity: 1,
                  height: height * 0.04,
                  width: height * 0.04,
                  backgroundColor: colors.primary,
                  borderRadius: height * 1,
                  position: 'absolute',
                  right: height * -0.01,
                  top: height * -0.01,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MyText
                  label={
                    cartItem?.quantity > 99
                      ? '99+'
                      : Number(cartItem?.quantity).toString()
                  }
                  textStyle={{
                    color: colors.background,
                    opacity: 1,
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <MyText label={dataItem?.name} />
              <View
                style={{
                  borderColor: '#00000030',
                  borderWidth: height * 0.001,
                  paddingHorizontal: 5,
                  borderRadius: height * 0.005,
                }}>
                <MyText
                  label={`Rs.${dataItem?.price}`}
                  textStyle={{opacity: 1}}
                />
              </View>
            </View>

            <View style={{opacity: 1}}>
              <AddToCartBtn
                item={{
                  ...dataItem,
                  quantity: Number(cartItem?.quantity || 0),
                }}
              />
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {data?.length > 0 &&
        data
          ?.filter(value => value?.Item?.length > 0)
          .map((item, index) => (
            <View
              key={index}
              style={{
                marginLeft: 15,
                marginVertical: 10,
                justifyContent: 'center',
              }}>
              <MyText
                label={item?.name}
                textStyle={{
                  fontSize: height * 0.03,
                  color: colors.text_normal,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <FlatList
                  data={item?.Item || []}
                  renderItem={item => renderList(item)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={
                    <View>
                      <Image
                        source={NotFound}
                        style={{height: height / 2.7, width: width - 30}}
                      />
                    </View>
                  }
                />
              </View>
            </View>
          ))}
    </ScrollView>
  );
};

export default Cards;
