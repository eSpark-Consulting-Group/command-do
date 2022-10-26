import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Fonts} from '../../utils/fonts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {MyText} from '../../components';

const {width, height} = Dimensions.get('window');

const IndividualCard = props => {
  const {label, data, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector(store => store);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // if (menuData?.data) {
    // console.log('asdjl--->', allData?.data);
    setIsLoading(true);
    // }
  }, [allData]);

  useEffect(() => {
    const menuData = count?.cart?.menuItems?.find(
      item => item.name === count?.cart?.foodType,
    );
    // console.log('navigaiton-->', menuData?.data);
    setAllData(menuData);
  }, [count?.cart?.foodType, count?.cart]);

  return (
    isLoading && (
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: height * 0.03,
            color: '#000',
            fontFamily: Fonts.Roboto_Bold,
            margin: height * 0.02,
          }}>
          {data.name}
        </Text>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: height * 0.02,
              marginBottom: height * 0.02,
            }}>
            {/* <ScrollView horizontal> */}
            {allData &&
              allData?.data?.map((dataItem, dataIndex) => (
                <Pressable
                  key={dataIndex}
                  style={{
                    paddingHorizontal: height * 0.01,
                    paddingTop: height * 0.01,
                    marginVertical: height * 0.02,
                  }}
                  onPress={() =>
                    navigation.navigate('Item', {
                      foodType: count?.cart?.foodType,
                      item: dataItem,
                    })
                  }>
                  <View
                    style={{
                      height: height * 0.25,
                      width: width * 0.88,
                      backgroundColor: 'white',
                      borderRadius: height * 0.02,
                      elevation: height * 0.003,
                    }}>
                    <Image
                      source={dataItem.image}
                      style={{
                        borderRadius: height * 0.02,
                        height: height * 0.25,
                        width: width * 0.88,
                        backgroundColor: 'white',
                      }}
                    />
                  </View>
                  <MyText
                    label={dataItem.name}
                    title
                    style={{
                      marginVertical: height * 0.005,
                      marginBottom: height * 0.04,
                    }}
                  />
                  <View
                    style={{
                      borderColor: '#00000030',
                      borderWidth: height * 0.001,
                      padding: height * 0.005,
                      position: 'absolute',
                      bottom: 0,
                      left: height * 0.01,
                      borderRadius: height * 0.005,
                    }}>
                    <MyText subTitle label={`Rs.${dataItem.price}`} />
                  </View>
                  {dataItem.qty != 0 && (
                    <View
                      style={{
                        height: height * 0.04,
                        width: height * 0.04,
                        backgroundColor: '#11a79c',
                        borderRadius: height * 1,
                        position: 'absolute',
                        right: height * -0.005,
                        top: height * -0.005,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MyText
                        label={
                          dataItem?.qty > 99 ? '99+' : Number(dataItem.qty)
                        }
                        subTitle
                        style={{color: '#fff'}}
                      />
                    </View>
                  )}
                </Pressable>
              ))}
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default IndividualCard;
