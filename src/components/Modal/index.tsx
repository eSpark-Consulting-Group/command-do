import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

import {colors} from '../../theme';

const {width, height} = Dimensions.get('window');

const CustomizeModal = (props: any) => {
  const {isVisible, setBackDrop, navigation, renderData} = props;
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
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
  }, [isVisible]);

  return (
    <>
      <StatusBar backgroundColor={isVisible ? '#000000' : colors.primary} />
      {isVisible && (
        <TouchableWithoutFeedback onPress={setBackDrop}>
          <View style={styles.modalContainer}>{renderData}</View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#00000070',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomizeModal;
