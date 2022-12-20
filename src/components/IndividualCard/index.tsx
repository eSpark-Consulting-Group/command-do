import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MyText} from '..';
import {NotFound} from '../../assets/images';
import {colors} from '../../theme';
import {AddToCartBtn} from '../AddToCartBtn';
import {SCREEN_HEIGHT} from '../../constants';
const {width, height} = Dimensions.get('window');

const IndividualCard = props => {
  const {label, data, navigation, fetchMoreOnEnd, loading, cursor} = props;
  const [isLoading, setIsLoading] = useState(false);
  const count = useSelector((store: any) => store);
  const [allData, setAllData] = useState<any>([]);
  const cart = useSelector((store: any) => store.cart);

  useEffect(() => {
    setIsLoading(true);
  }, [allData]);
  useEffect(() => {
    const menuData = count?.cart?.menuItems?.find(
      (item: any) => item.name === count?.cart?.foodType,
    );
    setAllData(menuData);
  }, [count?.cart?.foodType, count?.cart]);
  return (
    isLoading && (
      <View style={{flex: 1}}>
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
            showsVerticalScrollIndicator={false}
            onScroll={event => {
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

              if (
                event?.nativeEvent?.contentOffset?.y + SCREEN_HEIGHT * 1 <
                event?.nativeEvent?.contentSize?.height
              ) {
                props?.onScrollToTopStart();
              } else {
                props?.onReachEnd();
              }
            }}
            onEndReached={() => {
              if (cursor != null) {
                fetchMoreOnEnd();
              }
            }}
            ListFooterComponent={
              loading && data.length > 0 ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <View style={{height: height * 0.08}} />
              )
            }
            renderItem={({item: dataItem, index: dataIndex}) => {
              var cartItem = cart?.cartItems?.find(
                (value: any) => value?.id == dataItem?.id,
              );
              return (
                <Pressable
                  key={dataIndex}
                  style={{
                    marginVertical: 5,
                    paddingHorizontal: 5,
                    marginHorizontal: 10,
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
                      width: width * 0.9,
                      backgroundColor: colors.background,
                      borderRadius: height * 0.02,
                      elevation: height * 0.003,
                    }}>
                    <Image
                      source={{uri: dataItem?.image}}
                      style={{
                        borderRadius: height * 0.02,
                        height: height * 0.25,
                        width: width * 0.9,
                        backgroundColor: colors.background,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <View style={{alignItems: 'flex-start'}}>
                      <MyText label={dataItem?.name} />
                      <View
                        style={{
                          borderColor: '#00000030',
                          borderWidth: height * 0.001,
                          paddingHorizontal: 5,

                          borderRadius: height * 0.005,
                        }}>
                        <MyText label={`Rs.${dataItem?.price}`} />
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
                  {cartItem != undefined && cartItem?.quantity != 0 && (
                    <View
                      style={{
                        height: height * 0.04,
                        width: height * 0.04,
                        backgroundColor: colors.primary,
                        borderRadius: height * 1,
                        position: 'absolute',
                        right: height * -0.005,
                        top: height * -0.005,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MyText
                        label={
                          cartItem?.quantity > 99
                            ? '99+'
                            : Number(cartItem?.quantity).toString()
                        }
                        textStyle={{color: colors.background}}
                      />
                    </View>
                  )}
                </Pressable>
              );
            }}
            ListEmptyComponent={
              !loading ? (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={NotFound}
                    style={{height: height / 2.4, width: width - 30}}
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
