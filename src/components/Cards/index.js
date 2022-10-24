import React from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, Pressable } from 'react-native';
import { Fonts } from '../../utils/fonts';


const { width, height } = Dimensions.get('window');

const Cards = (props) => {
    const { label, data } = props;
    // console.log(data,'asdjl');
    return (
        <ScrollView style={{ flex: 1, }}>
            {
                data.map((item, index) => (
                    <View key={index} style={{
                        height: height * .46,
                        padding: height * .02,
                        marginBottom:data.length == index + 1 ? height * .04 : 0
                    }}>
                        <Text style={{
                            fontSize: height * .03,
                            color: '#000',
                            fontFamily: Fonts.Roboto_Bold,
                            marginVertical: height * .02

                        }}>
                            {item.name}
                        </Text>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                            <ScrollView horizontal>
                                {item?.data.map((dataItem, dataIndex) => (
                                    <Pressable key={dataIndex} style={{
                                        paddingHorizontal: height * .01,
                                        paddingTop: height * .01
                                    }} onPress={() => console.log("hello")}>
                                        <View style={{
                                            height: height * .25,
                                            width: width * .8,
                                            backgroundColor: 'white',
                                            borderRadius: height * .02,
                                            elevation: height * .003,

                                        }}>
                                            <Image source={dataItem.image} style={{
                                                borderRadius: height * .02,
                                                height: height * .25,
                                                width: width * .8,
                                                backgroundColor: 'white'
                                            }} />
                                        </View>
                                        <Text style={{
                                            fontSize: height * .022,
                                            color: '#000',
                                            fontFamily: Fonts.Roboto_Bold,
                                            marginVertical: height * .005,
                                            marginBottom: height * .04
                                        }}>
                                            {dataItem.name}
                                        </Text>
                                        <View style={{
                                            borderColor: '#00000030',
                                            borderWidth: height * .001,
                                            padding: height * .005,
                                            position: 'absolute',
                                            bottom: 0,
                                            left: height * .01,
                                            borderRadius: height * .005,

                                        }}>
                                            <Text style={{
                                                fontSize: height * .015,
                                                color: '#000',
                                                fontFamily: Fonts.Roboto_Bold,
                                            }}>
                                                {dataItem.price}
                                            </Text>
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
