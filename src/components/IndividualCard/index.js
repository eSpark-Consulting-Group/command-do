import React from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, Pressable } from 'react-native';
import { Fonts } from '../../utils/fonts';


const { width, height } = Dimensions.get('window');

const IndividualCard = (props) => {
  const { label, data } = props;
  console.log(data, 'asdjl');
  return (
    <View style={{ flex: 1, }}>
      <Text style={{
        fontSize: height * .03,
        color: '#000',
        fontFamily: Fonts.Roboto_Bold,
        margin: height * .02,
      }}>
        {data.name}
      </Text>
      <ScrollView style={{ flex: 1, }}>
        <View style={{
          padding: height * .02,
          marginBottom:height * .02
        }}>
          {/* <ScrollView horizontal> */}
          {data && data?.data.map((dataItem, dataIndex) => (
            <Pressable key={dataIndex} style={{
              paddingHorizontal: height * .01,
              paddingTop: height * .01,
              marginVertical: height * .02

            }} onPress={() => console.log("hello")}>
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
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualCard;
