import React, {useState} from 'react'
import {
    View,
    Dimensions,
    ScrollView,
    Image,
    Pressable,
    FlatList,
    LayoutAnimation,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import {DropDownAlert, MyText} from '..';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, increase } from '../../features/cart/cartSlice';
import Icon  from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const {width, height} = Dimensions.get('window');
export const AddToCartBtn = ({item}) => {
    const dispatch = useDispatch()
    const qtyWarn = React.useRef(null);
  
    const [editData, setEditData] = useState([]);
    const [editMode, setEditMode] = useState(0);
    const [animateToNumber, setAnimateToNumber] = useState(0);
    const [press, setPress] = useState(false);

    const addQty = (item: any) => {
        if (item?.quantity > 998) {
          // @ts-ignore
          qtyWarn.current();
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
    
      const addToCart = (updatedQuantity, item) => {
        // console.log('value---->', value);
        var changeData = {...item};
        changeData.quantity = updatedQuantity;
        dispatch(addItem(changeData));
        // @ts-ignore
        dispatch(increase());
      };
    
      const onChangeNumber = (value, item) => {
        if (Number(value) > 999) {
          // @ts-ignore
          qtyWarn.current();
        } else {
          addToCart(Number(value), item);
        }
      };
    
      const checkSetPress = () => {
        // console.log("runasldkj");
        setPress(false);
      };
    
      return (
        <>
          <DropDownAlert
            childFunc={qtyWarn}
            setPress={checkSetPress}
            message={'Woah! you have reached the limit!!!'}
            type="info"
            title="Warning"
          />
          {(item?.quantity) ? (
            <View style={styles.numericBtnContainer}>
              <TouchableOpacity
                style={styles.removeNumericButton}
                onPress={() => removeQty(item)}>
                <Icon name="remove" size={height * 0.03} color="white" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                // onChangeText={(text) => onChangeNumber(text, item)}
                defaultValue={item?.quantity?.toString()}
                textAlign="center"
                keyboardType="numeric"
                onSubmitEditing={(val) => onChangeNumber(val?.nativeEvent?.text, item)}
              />
              <TouchableOpacity style={styles.addNumericButton} onPress={() => addQty(item)}>
                <Icon name="add" size={height * 0.03} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                borderRadius: height * 1,
                backgroundColor: '#11a79c',
                elevation: 3,
                height: height * 0.05,
                width: height * 0.05,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
              onPress={() => addQty(item)}>
              <Icon name="add" size={height * 0.03} color="white" />
            </TouchableOpacity>
          )}
        </>
      );
} 