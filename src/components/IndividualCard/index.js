import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, Pressable } from 'react-native';
import { Fonts } from '../../utils/fonts';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MyText } from "../../components";


const { width, height } = Dimensions.get('window');

const IndividualCard = (props) => {
  const { label, data, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // if (menuData?.data) {
    // console.log('asdjl--->', allData?.data);
    setIsLoading(true)
    // }
  }, [allData])

  useEffect(() => {
    const menuData = count?.cart?.menuItems?.find((item) => item.name === count?.cart?.foodType);
    // console.log('navigaiton-->', menuData?.data);
    setAllData(menuData)
  }, [count?.cart?.foodType, count?.cart])



  return (
    isLoading &&
    <View style={{ flex: 1, }}>
      <Text style={{
        fontSize: height * .03,
        color: '#000',
        fontFamily: Fonts.Roboto_Bold,
        margin: height * .02,
      }}>
        {data.name}
      </Text>
      <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
        <View style={{
          padding: height * .02,
          marginBottom: height * .02
        }}>
          {/* <ScrollView horizontal> */}
          {allData && allData?.data?.map((dataItem, dataIndex) => (
            <Pressable key={dataIndex} style={{
              paddingHorizontal: height * .01,
              paddingTop: height * .01,
              marginVertical: height * .02

            }}
              onPress={() => navigation.navigate('Item', { foodType: count?.cart?.foodType, item: dataItem })}>
              <View style={{
                height: height * .25,
                width: width * .88,
                backgroundColor: 'white',
                borderRadius: height * .02,
                elevation: height * .003,

              }}>
                <Image source={dataItem.image} style={{
                  borderRadius: height * .02,
                  height: height * .25,
                  width: width * .88,
                  backgroundColor: 'white'
                }} />
              </View>
              <MyText label={dataItem.name} title style={{
                marginVertical: height * .005,
                marginBottom: height * .04
              }} />
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
            </Pressable >
          ))}
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualCard;
