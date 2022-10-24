// BooksScreen.js
import React from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

function BookScreen() {
  const count = useSelector(store => store);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor='white' />
      <View
        style={{
          flex: .5,
          backgroundColor: "gray",
          justifyContent:"space-evenly",
          alignItems:'center'
        }}>
          <Icon name="person-circle-outline" size={height * .03} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "red"
        }}>

      </View>
      <View
        style={{
          flex: .5,
          backgroundColor: "gray"
        }}>

      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "red"
        }}>

      </View>
    </View>
  )
}

export default BookScreen