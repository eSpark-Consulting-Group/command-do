import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem, increase} from '../../features/cart/cartSlice';
import AD from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {colors} from '../../theme';
import {moderateVerticalScale} from 'react-native-size-matters';
import {showMessage} from 'react-native-flash-message';
import {useLayoutAnimation} from '../../utils/hooks/useUpdateEffect/useLayoutAnimation';
import MyText from '../Text';

export const AddToCartBtn = ({item}) => {
  const dispatch = useDispatch();

  const addQty = (item: any) => {
    if (item?.quantity > 998) {
      showMessage({
        message: 'Warning',
        description: 'Woah! you have reached the limit!!!',
        type: 'info',
        icon: 'auto',
      });
    } else {
      useLayoutAnimation();
      addToCart((item?.quantity ?? 0) + 1, item);
    }
  };

  const removeQty = (item: any) => {
    useLayoutAnimation();
    addToCart(item?.quantity - 1, item);
  };

  const addToCart = (updatedQuantity: any, item: any) => {
    var changeData = {...item};
    changeData.quantity = updatedQuantity;
    dispatch(addItem(changeData));
    // @ts-ignore
    dispatch(increase());
  };

  return (
    <>
      {item?.quantity ? (
        <View style={styles.numericBtnContainer}>
          <TouchableOpacity
            style={styles.addNumericButton}
            onPress={() => addQty(item)}>
            <AD
              name="plus"
              size={moderateVerticalScale(15)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
          <View style={styles.quantityInput}>
            <MyText
              label={item?.quantity?.toString()}
              textStyle={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: moderateVerticalScale(20),
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.removeNumericButton}
            onPress={() => removeQty(item)}>
            <AD
              name="minus"
              size={moderateVerticalScale(15)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: moderateVerticalScale(50),
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: moderateVerticalScale(20),
              backgroundColor: colors.primary,
              elevation: 2,
              height: moderateVerticalScale(30),
              width: moderateVerticalScale(30),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => addQty(item)}>
            <AD
              name="plus"
              size={moderateVerticalScale(15)}
              color={colors.text_inverse}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
