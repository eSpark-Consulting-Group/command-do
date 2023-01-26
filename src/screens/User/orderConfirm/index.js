import React, { useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';

import { MyText } from '../../../components';
import { OrderDone, TickGif } from '../../../assets/images';
import { styles } from './styles';
import { colors } from '../../../theme';
import { BackHandler } from 'react-native';

const { width, height } = Dimensions.get('window');

function OrderConfirm({ route, navigation }) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backTohome,
    );
    return () => backHandler.remove();
  }, []);

  const backTohome = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <View style={{ height: height * 1, backgroundColor: 'white' }}>
      <View style={styles.topCurveView}></View>

      <View style={styles.mainContent}>
        <Image source={TickGif} style={styles.gifStyle} />
      </View>
      <View style={styles.bottomCurveView} />
      <Image source={OrderDone} style={styles.orderDoneGif} />
      <View style={styles.completeOrderTextContainer}>
        <MyText
          label={'Your order is complete!'}
          size="title"
          textStyle={{ color: colors.text_inverse }}
        />
        <MyText
          label={'Thanks'}
          size="title"
          textStyle={{ color: colors.text_inverse }}
        />
        <TouchableOpacity style={styles.backToHomeButton} onPress={backTohome}>
          <MyText
            label={'Go back to home'}
            size={'title'}
            style={{ color: colors.primary }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OrderConfirm;
