import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
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
import GapView from '../GapView';

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
          marginVertical: moderateVerticalScale(10),
          elevation: moderateVerticalScale(2),
          backgroundColor: colors.background,
          borderRadius: moderateVerticalScale(14),
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
            height: moderateVerticalScale(200),
          }}>
          {/* <Image
            source={{ uri: dataItem?.image }}
            style={{
              borderRadius: height * 0.02,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              height: moderateVerticalScale(150),
              // width: moderateVerticalScale(310),
              backgroundColor: colors.background,
            }}
          /> */}
          <ImageBackground
            source={{ uri: dataItem?.image }}
            borderRadius={moderateVerticalScale(14)}
            style={{
              height: '100%',
            }}>
            {cartItem != undefined && cartItem?.quantity != 0 && (
              <View
                style={{
                  height: moderateVerticalScale(28),
                  width: moderateVerticalScale(28),
                  backgroundColor: colors.primary,
                  borderRadius: moderateVerticalScale(40),
                  position: 'absolute',
                  right: moderateVerticalScale(-10),
                  top: moderateVerticalScale(-10),
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
            <View
              style={{
                position: 'absolute',
                bottom: moderateVerticalScale(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: moderateVerticalScale(10),
                paddingVertical: moderateVerticalScale(5),
                backgroundColor: colors.background + 'ab',
                borderColor: '#00000022',
                borderTopWidth: moderateVerticalScale(0.5),
                borderBottomWidth: moderateVerticalScale(0.5),
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
                    textShadowColor: colors.text_normal,
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 4,
                    fontSize: moderateVerticalScale(20),
                    color: '#fff',
                    top: 0,
                  }}
                />
                <View
                  style={{
                    borderColor: '#000000',
                    borderWidth: moderateVerticalScale(1),
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
          </ImageBackground>
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
                justifyContent: 'center',
              }}>
              <MyText
                label={item?.name}
                textStyle={{
                  fontSize: moderateVerticalScale(21),
                  color: colors.text_normal,
                  left: moderateVerticalScale(12),
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <FlatList
                  data={item?.Item || []}
                  renderItem={item => renderList(item)}
                  ListHeaderComponent={
                    <GapView
                      length={moderateVerticalScale(12)}
                      mode={'horizontal'}
                    />
                  }
                  ListFooterComponent={
                    <GapView
                      length={moderateVerticalScale(12)}
                      mode={'horizontal'}
                    />
                  }
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
