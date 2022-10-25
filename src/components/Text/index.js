import React from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, Pressable } from 'react-native';
import { Fonts } from '../../utils/fonts';


const { width, height } = Dimensions.get('window');

const MyText = (props) => {
  const { label, data, heading, subHeading, title, subTitle, style } = props;
  // console.log(heading, 'asdjl');
  return (
    <Text style={[{
      fontSize: heading ? height * .045 : subHeading ? height * .03 : title ? height * .02 : height * .017,
      color: '#000',
      fontFamily: title || subTitle ? Fonts.Roboto_Medium : Fonts.Roboto_Bold,
    },style]}>
      {label && label}
    </Text>
  );
};

export default MyText;
