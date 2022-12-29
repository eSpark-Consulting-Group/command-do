import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors} from '../../theme';
import {useLayoutAnimation} from '../../utils/hooks/useUpdateEffect/useLayoutAnimation';

const {width, height} = Dimensions.get('window');

const CustomizeModal = (props: any) => {
  const {isVisible, setBackDrop, navigation, renderData} = props;

  useEffect(() => {
    useLayoutAnimation(200);
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
