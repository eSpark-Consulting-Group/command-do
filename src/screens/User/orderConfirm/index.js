import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MyText} from '../../../components';
import {OrderDone, TickGif} from '../../../assets/images';
import {clearCart} from '../../../features/cart/cartSlice';
import {styles} from './styles';
import {colors} from '../../../theme';
import {BackHandler} from 'react-native';

const {width, height} = Dimensions.get('window');

function OrderConfirm({route, navigation}) {
  const [isTick, setIsTick] = useState(false);
  const dispatch = useDispatch();
  const [progressText, setProgresText] = useState('Cart');
  const [progress, setProgress] = useState(0.7);
  const [animatedValue, setAnimatedValue] = useState(
    new Animated.Value(height * 0.0012),
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backTohome,
    );
    return () => backHandler.remove();
  }, []);

  const backTohome = () => {
    dispatch(clearCart());
    navigation.navigate('Home');
    return true;
  };

  return (
    <View style={{height: height * 1, backgroundColor: 'white'}}>
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
          textStyle={{color: colors.text_inverse}}
        />
        <MyText
          label={'Thanks'}
          size="title"
          textStyle={{color: colors.text_inverse}}
        />
        <TouchableOpacity style={styles.backToHomeButton} onPress={backTohome}>
          <MyText
            label={'Go back to home'}
            size={'title'}
            style={{color: colors.primary}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OrderConfirm;
