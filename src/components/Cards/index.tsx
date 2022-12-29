import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { MyText } from '..';
import { NotFound } from '../../assets/images';
import { SCREEN_WIDTH } from '../../constants';
import { colors } from '../../theme';
import { AddToCartBtn } from '../AddToCartBtn';

const { width, height } = Dimensions.get('window');

const Cards = props => {
  const { label, data, navigation } = props;
  const cart = useSelector((store: any) => store.cart);

  const renderList = ({ item: dataItem, index: dataIndex }) => {
    var cartItem = cart?.cartItems?.find(
      (value: any) => value?.id == dataItem?.id,
    );
    return (
      <Pressable
        key={dataIndex}
        style={{
          margin: moderateVerticalScale(5),
          padding: moderateVerticalScale(10),
          elevation: moderateVerticalScale(2),
          backgroundColor: colors.background,
          borderRadius: height * 0.02,
          width: width * 0.8,
        }}
        onPress={() =>
          navigation.navigate('Item', {
            foodType: dataItem?.name,
            item: dataItem,
          })
        }>
        <View
          style={{
            height: moderateVerticalScale(150),
            // width: moderateVerticalScale(310),
            borderRadius: height * 0.02,
          }}>
          <Image
            source={{ uri: dataItem?.image }}
            style={{
              borderRadius: height * 0.02,
              height: moderateVerticalScale(150),
              // width: moderateVerticalScale(310),
              backgroundColor: colors.background,
            }}
          />
          {cartItem != undefined && cartItem?.quantity != 0 && (
            <View
              style={{
                height: moderateVerticalScale(28),
                width: moderateVerticalScale(28),
                backgroundColor: colors.primary,
                borderRadius: moderateVerticalScale(40),
                position: 'absolute',
                right: moderateVerticalScale(-14),
                top: moderateVerticalScale(-14),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                label={
                  cartItem?.quantity > 99
                    ? '99+'
                    : Number(cartItem?.quantity).toString()
                }
                size={'subTitle'}
                textStyle={{
                  color: colors.background,
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // width: moderateVerticalScale(310),
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <MyText
              label={dataItem?.name}
              numberOfLines={2}
              textStyle={{
                marginVertical: moderateVerticalScale(2),
              }}
            />
            <View
              style={{
                borderColor: '#00000030',
                borderWidth: height * 0.001,
                paddingHorizontal: 5,
                borderRadius: height * 0.005,
              }}>
              <MyText
                label={`Rs.${dataItem?.price}`}
                textStyle={{ opacity: 1 }}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={1}>
            <AddToCartBtn
              item={{
                ...dataItem,
                quantity: Number(cartItem?.quantity || 0),
              }}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {data?.length > 0 &&
        data
          ?.filter(value => value?.Item?.length > 0)
          .map((item, index) => (
            <View
              key={index}
              style={{
                marginLeft: 15,
                justifyContent: 'center',
              }}>
              <MyText
                label={item?.name}
                textStyle={{
                  fontSize: moderateVerticalScale(21),
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
                        style={{ height: height / 2.7, width: width - 30 }}
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
