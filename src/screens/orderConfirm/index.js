import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, StatusBar, Image, StyleSheet, Animated, } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MyText } from "../../components";
import * as Progress from 'react-native-progress';
import { OrderDone, TickGif } from "../../assets/images";
import { clearCart } from '../../features/cart/cartSlice';


const { width, height } = Dimensions.get('window');

function OrderConfirm({ route, navigation }) {
  const [isTick, setIsTick] = useState(false);
  const [getData, setGetData] = useState({});
  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const [progressText, setProgresText] = useState("Cart");
  const [progress, setProgress] = useState(.7);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(height * .0012));


  useEffect(() => {
    setTimeout(() => {
      setProgress(1)
      setTimeout(() => {
        setProgresText("Complete")
        Animated.spring(animatedValue, {
          toValue: height * .0015,
          friction: 1,
          tension: 100,
          useNativeDriver: true
        }).start()
      }, 200);
    }, 300);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (progressText === "Complete") {
        setIsTick(true)
      }
    }, 2000);
  }, [progressText])

  const backTohome = () => {
    dispatch(clearCart());
    navigation.navigate('Home')
  }

  return (
    <View style={{ height: height * 1, backgroundColor: 'white' }} >
      <StatusBar barStyle={'dark-content'} backgroundColor='white' />
      <View style={{
        backgroundColor: 'white',
        width: height * 3.3,
        height: height * 3.3,
        borderRadius: height * 4,
        position: 'absolute',
        bottom: height * .855,
        left: height * -1.36,
        zIndex: 1,
      }}>
      </View>
      <View style={{
        // backgroundColor: 'red',
        height: height * .12,
        width: width * 1,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {
          !isTick ?

            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Animated.View useNativeDriver={true} style={{
                position: 'absolute',
                transform: [
                  { scale: animatedValue }
                ]
              }}>

                <MyText label={progressText} subTitle style={{ color: '#00000080' }} />
              </Animated.View>
              <Progress.Circle
                size={height * .11}
                progress={progress}
                thickness={height * .005}
                color="#11a79c"
                borderWidth={0}
                unfilledColor="#00000020"
              />
              {/* 
          <Text style={{}}>

          </Text> */}
            </View>
            :
            <Image
              // source={OrderDone}
              source={TickGif}
              style={{
                height: height * .1,
                width: height * .1,
                borderRadius: height * .015,
                resizeMode: "cover",
                // position: 'relative',
                // right: height * .06,
              }}
            />
        }
        {/* <MyText label={'Order Confrim 🎉'} heading style={{ marginLeft: height * .04, }} /> */}
      </View>
      <View style={{
        backgroundColor: '#61C2BC',
        width: height * 3.3,
        height: height * 3.3,
        borderRadius: height * 4,
        position: 'absolute',
        bottom: height * .1,
        left: height * -1.36,
      }}>
      </View>
      <Image
        // source={OrderDone}
        source={OrderDone}
        style={{
          height: height * .45,
          width: height * .6,
          borderRadius: height * .015,
          resizeMode: "cover",
          position: 'relative',
          right: height * .06,
        }}
      />
      <View style={{
        // backgroundColor: 'red',
        height: height * .3,
        width: width * 1,
        zIndex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
      }}>
        <MyText label={'Your order is complete!'} subHeading style={{}} />
        <MyText label={'Thanks'} heading style={{}} />
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            height: height * .06,
            borderRadius: height * .005,
            padding: height * .015,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: height * .003,
            position: 'absolute',
            bottom: height * .03
          }}
          onPress={backTohome}
        >
          <MyText label={'Go back to home'} title style={{ color: '#11a79c' }} />
          {/* <MyText label={'👍'} subHeading style={{
            transform: [
              { scaleX: -1 }
            ]
          }} /> */}
        </TouchableOpacity>
      </View>

    </View >
  );
};

// trash-outline

export default OrderConfirm;

const styles = StyleSheet.create({

  // Header Container

})