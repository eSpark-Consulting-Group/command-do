import React, {useState} from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, increase} from '../../features/cart/cartSlice';
import AD from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {colors} from '../../theme';
import {moderateVerticalScale} from 'react-native-size-matters';
import {showMessage} from 'react-native-flash-message';

export const AddToCartBtn = ({item}) => {
  const dispatch = useDispatch();

  const addQty = (item: any) => {
    if (item?.quantity > 998) {
      // @ts-ignore
      showMessage({
        message: 'Warning',
        description: 'Woah! you have reached the limit!!!',
        type: 'info',
        icon: 'auto',
      });
    } else {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
      addToCart((item?.quantity ?? 0) + 1, item);
    }
  };

  const removeQty = (item: any) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    addToCart(item?.quantity - 1, item);
  };

  const addToCart = (updatedQuantity: any, item: any) => {
    var changeData = {...item};
    changeData.quantity = updatedQuantity;
    dispatch(addItem(changeData));
    // @ts-ignore
    dispatch(increase());
  };

  const onChangeNumber = (value, item) => {
    if (Number(value) > 99) {
      // @ts-ignore
      showMessage({
        message: 'Warning',
        description: 'Woah! you have reached the limit!!!',
        type: 'info',
        icon: 'auto',
      });
    } else {
      addToCart(Number(value), item);
    }
  };

  return (
    <>
      {item?.quantity ? (
        <View style={styles.numericBtnContainer}>
          <TouchableOpacity
            style={styles.removeNumericButton}
            onPress={() => removeQty(item)}>
            <AD
              name="minus"
              size={moderateVerticalScale(18)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            defaultValue={item?.quantity?.toString()}
            textAlign="center"
            keyboardType="numeric"
            onSubmitEditing={val =>
              onChangeNumber(val?.nativeEvent?.text, item)
            }
            editable={false}
          />
          <TouchableOpacity
            style={styles.addNumericButton}
            onPress={() => addQty(item)}>
            <AD
              name="plus"
              size={moderateVerticalScale(18)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{height: moderateVerticalScale(50), justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              borderRadius: moderateVerticalScale(20),
              backgroundColor: colors.primary,
              elevation: 3,
              height: moderateVerticalScale(35),
              width: moderateVerticalScale(35),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => addQty(item)}>
            <AD
              name="plus"
              size={moderateVerticalScale(18)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
