import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { MyText } from '..';
import { NotFound } from '../../assets/images';
import { colors } from '../../theme';
import { AddToCartBtn } from '../AddToCartBtn';
import { SCREEN_HEIGHT } from '../../constants';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useLayoutAnimation } from '../../utils/hooks/useUpdateEffect/useLayoutAnimation';
const { width, height } = Dimensions.get('window');

const IndividualCard = props => {
  const { label, data, navigation, fetchMoreOnEnd, loading, cursor, refVal } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((store: any) => store.cart);
  const itemsList = useRef(null);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    console.log('data changed');
    //@ts-ignore
    // itemsList?.current?.scrollToOffset({animated: false, offset: 0});
  }, [data]);

  return (
    isLoading && (
      <View style={{ flex: 1 }}>
        <MyText
          label={data?.length > 0 ? data[0].Category?.name : ''}
          textStyle={{
            fontSize: height * 0.03,
            color: '#000',
            marginHorizontal: height * 0.02,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <FlatList
            data={data || []}
            ref={itemsList}
            showsVerticalScrollIndicator={false}
            onScroll={event => {
              useLayoutAnimation();
              if (
                event?.nativeEvent?.contentOffset?.y + SCREEN_HEIGHT * 1 <
                event?.nativeEvent?.contentSize?.height
              ) {
                props?.onScrollToTopStart();
              } else {
                if (cursor == null) {
                  props?.onReachEnd();
                }
              }
            }}
            onEndReached={() => {
              if (cursor != null && !loading) {
                fetchMoreOnEnd();
                //@ts-ignore
                itemsList?.current?.scrollToEnd();
              }
            }}
            ListFooterComponent={
              loading && data.length > 0 ? (
                <View
                  style={{
                    height: moderateVerticalScale(55),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <ActivityIndicator size={'large'} />
                  <MyText
                    label={`Loading More ${data[0].Category?.name} Items...`}
                  />
                </View>
              ) : (
                <View style={{ height: moderateVerticalScale(55) }} />
              )
            }
            renderItem={({ item: dataItem, index: dataIndex }) => {
              var cartItem = cart?.cartItems?.find(
                (value: any) => value?.id == dataItem?.id,
              );
              return (
                <Pressable
                  key={dataIndex}
                  style={{
                    margin: moderateVerticalScale(12),
                    elevation: 2,
                    backgroundColor: colors.background,
                    borderRadius: height * 0.02,
                    width: width * 0.9,
                  }}
                  onPress={() =>
                    navigation.navigate('Item', {
                      foodType: dataItem?.name,
                      item: dataItem,
                    })
                  }>
                  <View
                    style={{
                      height: height * 0.25,
                    }}>
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
                            elevation: moderateVerticalScale(2),
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
            }}
            ListEmptyComponent={
              !loading ? (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={NotFound}
                    style={{ height: height / 2.4, width: width - 30 }}
                  />
                  <MyText label={'No Items Found'} size={'subHeading'} />
                </View>
              ) : null
            }
          />
        </View>
      </View>
    )
  );
};
export default IndividualCard;
