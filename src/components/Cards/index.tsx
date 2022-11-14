import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {MyText} from '..';
import {useSelector} from 'react-redux';
import {NotFound} from '../../assets/images';

const {width, height} = Dimensions.get('window');

const Cards = props => {
  const {label, data, navigation} = props;
  const cart = useSelector((store: any) => store.cart);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {data?.length > 0 &&
        data
          ?.filter(value => value?.Item?.length > 0)
          .map((item, index) => (
            <View
              key={index}
              style={{
                height: height * 0.46,
                padding: height * 0.02,
                marginBottom: data.length == index + 1 ? height * 0.04 : 0,
              }}>
              <MyText
                label={item?.name}
                textStyle={{
                  fontSize: height * 0.03,
                  color: '#000',
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <FlatList
                  data={item?.Item || []}
                  renderItem={({item: dataItem, index: dataIndex}) => {
                    var cartItem = cart?.cartItems?.find(
                      value => value?.id == dataItem?.id,
                    );

                    return (
                      <Pressable
                        key={dataIndex}
                        style={{
                          paddingHorizontal: height * 0.01,
                          paddingTop: height * 0.01,
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
                            width: width * 0.8,
                            backgroundColor: 'white',
                            borderRadius: height * 0.02,
                            elevation: width * 0.003,
                          }}>
                          <Image
                            source={{uri: dataItem?.image}}
                            style={{
                              borderRadius: height * 0.02,
                              height: height * 0.25,
                              width: width * 0.8,
                              backgroundColor: 'white',
                            }}
                          />
                          {cartItem != undefined && cartItem?.quantity != 0 && (
                            <View
                              style={{
                                height: height * 0.04,
                                width: height * 0.04,
                                backgroundColor: '#11a79c',
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
                              />
                            </View>
                          )}
                        </View>
                        <MyText
                          label={dataItem?.name}
                          textStyle={{marginTop: height * 0.02}}
                        />
                        <View
                          style={{
                            borderColor: '#00000030',
                            borderWidth: height * 0.001,
                            padding: height * 0.005,
                            position: 'absolute',
                            bottom: 0,
                            left: height * 0.01,
                            borderRadius: height * 0.005,
                          }}>
                          <MyText label={`Rs.${dataItem?.price}`} />
                        </View>
                      </Pressable>
                    );
                  }}
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
