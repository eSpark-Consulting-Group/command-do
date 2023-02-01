import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';

import { colors } from '../../theme';

const OverlayLoader = ({ show }: { show: boolean }) => {
  return (
    <Modal
      visible={show}
      presentationStyle="overFullScreen"
      transparent
      statusBarTranslucent
      animationType="fade"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
          opacity: 0.65,
        }}>
        <ActivityIndicator size={44} color={colors.primary} />
      </View>
    </Modal>
  );
};

export default OverlayLoader;
