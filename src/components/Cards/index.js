import React from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, Pressable } from 'react-native';
import { Fonts } from '../../utils/fonts';
import { MyText } from "../../components";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const { width, height } = Dimensions.get('window');

const Cards = (props) => {
    const { label, data, navigation } = props;
    const count = useSelector(store => store);

    // console.log('menuItems--->', count?.cart?.menuItems);
    return (
        <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
            {count?.cart?.menuItems &&
                count?.cart?.menuItems.map((item, index) => (
                    <View key={index} style={{
                        height: height * .46,
                        padding: height * .02,
                        marginBottom: data.length == index + 1 ? height * .04 : 0
                    }}>
                        <MyText label={item.name} subHeading style={{ marginVertical: height * .02 }} />
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {item?.data.map((dataItem, dataIndex) => (
                                    // console.log(dataItem),
                                    <Pressable key={dataIndex} style={{
                                        paddingHorizontal: height * .01,
                                        paddingTop: height * .01
                                    }} onPress={() => navigation.navigate('Item', { foodType: item.name, item: dataItem })}>
                                        <View style={{
                                            height: height * .25,
                                            width: width * .8,
                                            backgroundColor: 'white',
                                            borderRadius: height * .02,
                                            elevation: width * .003,
                                        }}>
                                            <Image source={dataItem.image} style={{
                                                borderRadius: height * .02,
                                                height: height * .25,
                                                width: width * .8,
                                                backgroundColor: 'white'
                                            }} />
                                            {dataItem.qty != 0 &&
                                                <View style={{
                                                    height: height * .04,
                                                    width: height * .04,
                                                    backgroundColor: '#11a79c',
                                                    borderRadius: height * 1,
                                                    position: 'absolute',
                                                    right: height * -.005,
                                                    top: height * -.005,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <MyText label={dataItem?.qty > 99 ? '99+' : Number(dataItem.qty)} subTitle style={{ color: '#fff' }} />
                                                </View>
                                            }
                                        </View>
                                        <MyText label={dataItem.name} title style={{ marginVertical: height * .01 }} />
                                        <View style={{
                                            borderColor: '#00000030',
                                            borderWidth: height * .001,
                                            padding: height * .005,
                                            position: 'absolute',
                                            bottom: 0,
                                            left: height * .01,
                                            borderRadius: height * .005,

                                        }}>
                                            <MyText subTitle label={`Rs.${dataItem.price}`} />
                                        </View>

                                    </Pressable >

                                ))}
                            </ScrollView>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    );
};

export default Cards;
