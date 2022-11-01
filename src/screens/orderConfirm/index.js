import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MyText} from '../../components';
import * as Progress from 'react-native-progress';
import {OrderDone, TickGif} from '../../assets/images';
import {clearCart} from '../../features/cart/cartSlice';
import {styles} from './styles';

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
    setTimeout(() => {
      setProgress(1);
      setTimeout(() => {
        setProgresText('Complete');
        Animated.spring(animatedValue, {
          toValue: height * 0.0015,
          friction: 1,
          tension: 100,
          useNativeDriver: true,
        }).start();
      }, 200);
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (progressText === 'Complete') {
        setIsTick(true);
      }
    }, 2000);
  }, [progressText]);

  const backTohome = () => {
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  return (
    <View style={{height: height * 1, backgroundColor: 'white'}}>
      {/* <StatusBar barStyle={'dark-content'} backgroundColor="white" /> */}
      <View style={styles.topCurveView}></View>

      <View style={styles.mainContent}>
        {!isTick ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.View
              useNativeDriver={true}
              style={{
                position: 'absolute',
                transform: [{scale: animatedValue}],
              }}>
              <MyText
                label={progressText}
                subTitle
                style={{color: '#00000080'}}
              />
            </Animated.View>
            <Progress.Circle
              size={height * 0.12}
              progress={progress}
              thickness={height * 0.005}
              color="#11a79c"
              borderWidth={0}
              unfilledColor="#00000020"
            />
            {/* 
          <Text style={{}}>

          </Text> */}
          </View>
        ) : (
          <Image
            // source={OrderDone}
            source={TickGif}
            style={styles.gifStyle}
          />
        )}
        {/* <MyText label={'Order Confrim 🎉'} heading style={{ marginLeft: height * .04, }} /> */}
      </View>
      <View style={styles.bottomCurveView}></View>
      <Image
        // source={OrderDone}
        source={OrderDone}
        style={styles.orderDoneGif}
      />
      <View style={styles.completeOrderTextContainer}>
        <MyText label={'Your order is complete!'} subHeading style={{}} />
        <MyText label={'Thanks'} heading style={{}} />
        <TouchableOpacity style={styles.backToHomeButton} onPress={backTohome}>
          <MyText label={'Go back to home'} title style={{color: '#11a79c'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// trash-outline

export default OrderConfirm;
