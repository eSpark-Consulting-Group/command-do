import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Fonts} from '../../utils/fonts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {MyText} from '..';
import {NotFound} from '../../assets/images';
import {colors} from '../../theme';
import {AddToCartBtn} from '../AddToCartBtn';

const {width, height} = Dimensions.get('window');

type Item = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number;
};
const IndividualCard = props => {
  const {label, data, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((store: any) => store);
  const [allData, setAllData] = useState<any>([]);
  const cart = useSelector((store: any) => store.cart);
  useEffect(() => {
    // if (menuData?.data) {
    // console.log('asdjl--->', allData?.data);
    setIsLoading(true);
    // }
  }, [allData]);

  useEffect(() => {
    const menuData = count?.cart?.menuItems?.find(
      item => item.name === count?.cart?.foodType,
    );
    // console.log('navigaiton-->', menuData?.data);
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
            margin: height * 0.02,
          }}
        />
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: height * 0.02,
              marginBottom: height * 0.02,
            }}>
            {/* <ScrollView horizontal> */}
            {data?.length > 0 ? (
              data?.map((dataItem: Item, dataIndex) => {
                var cartItem = cart?.cartItems?.find(
                  value => value?.id == dataItem?.id,
                );
                return (
                  <Pressable
                    key={dataIndex}
                    style={{
                      paddingHorizontal: height * 0.01,
                      marginVertical: dataIndex != 0 ? height * 0.04 : 0,
                      marginBottom: dataIndex == 0 ? height * 0.04 : 0,
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
                        width: width * 0.88,
                        backgroundColor: 'white',
                        borderRadius: height * 0.02,
                        elevation: height * 0.003,
                      }}>
                      <Image
                        source={{uri: dataItem?.image}}
                        style={{
                          borderRadius: height * 0.02,
                          height: height * 0.25,
                          width: width * 0.88,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <>
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
                            bottom: -40,
                            // left: height * 0.01,
                            borderRadius: height * 0.005,
                          }}>
                          <MyText label={`Rs.${dataItem?.price}`} />
                        </View>
                      </>
                      <View style={{top: 20}}>
                        <AddToCartBtn
                          item={{
                            ...dataItem,
                            quantity: Number(cartItem?.quantity || 0),
                          }}
                        />
                      </View>
                    </View>
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
                          textStyle={{color: colors.background}}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })
            ) : (
              <View>
                <Image
                  source={NotFound}
                  style={{height: height / 2.4, width: width - 30}}
                />
              </View>
            )}
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default IndividualCard;
