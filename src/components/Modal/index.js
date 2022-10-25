
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, Dimensions, StatusBar, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, UIManager, Platform } from "react-native";
import { MyText } from "../index";
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const CustomizeModal = (props) => {
  const { isVisible, setBackDrop, navigation, renderData } = props;
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  LayoutAnimation.configureNext({
    duration: 200,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });

  

  return (
    isVisible &&
    <TouchableWithoutFeedback onPress={setBackDrop}>
      <View style={styles.modalContainer}>
        {renderData}
      </View >
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#00000070',
    position: 'absolute',
    zIndex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalInner: {
    height: height * .2,
    width: width * .3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: height * .005,
    zIndex: 1,
    top: height * .035,
    left: height * .03,
    elevation: height * .003,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: 'flex-end',
    padding: height * .01,
    borderBottomWidth: height * .0005,
    borderBottomColor: '#00000050'
  },
  btnIcon: {
    paddingRight: height * .01,
  }
});

export default CustomizeModal;