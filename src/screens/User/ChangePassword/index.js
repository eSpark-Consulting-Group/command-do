import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {MyHeader} from '../../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';

export default function ChangePassword({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyHeader
        onPressLeft={() => navigation?.navigate('Home')}
        leftIcon="arrow-back"
        title="Change Password"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
        }}
      />
      <Text>ChangePass</Text>
      <TextInput
        onChangeText={text => {
          emailRef.current = text;
        }}
        placeholder="Current Password"
        style={styles.inputStyle}
        placeholderTextColor="gray"
      />
      <TextInput
        onChangeText={text => {
          emailRef.current = text;
        }}
        placeholder="New Password"
        style={styles.inputStyle}
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: SCREEN_HEIGHT * 0.005,
    paddingLeft: SCREEN_HEIGHT * 0.015,
    borderWidth: SCREEN_HEIGHT * 0.001,
    marginVertical: SCREEN_HEIGHT * 0.01,
    // fontFamily: Fonts.Roboto_Medium,
    color: 'black',
  },
});
