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
import {MyText} from '..';

const {width, height} = Dimensions.get('window');

type Item = {
  name: string;
  image: any;
  price: number;
  qty: number;
};
const IndividualCard = props => {
  const {label, data, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((store: any) => store);
  const [allData, setAllData] = useState<any>([]);

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
        <MyText
          label={data.name}
          textStyle={{
            fontSize: height * 0.03,
            color: '#000',
            margin: height * 0.02,
          }}
        />
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: height * 0.02,
              marginBottom: height * 0.02,
            }}>
            {/* <ScrollView horizontal> */}
            {allData &&
              allData?.data?.map((dataItem: Item, dataIndex) => (
                <Pressable
                  key={dataIndex}
                  style={{
                    paddingHorizontal: height * 0.01,
                    marginVertical: dataIndex != 0 ? height * 0.04 : 0,
                    marginBottom: dataIndex == 0 ? height * 0.04 : 0,
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
                    textStyle={{
                      marginVertical: height * 0.02,
                      left: height * 0.01,
                    }}
                  />
                  <View
                    style={{
                      borderColor: '#00000030',
                      borderWidth: height * 0.001,
                      padding: height * 0.005,
                      position: 'absolute',
                      bottom: -(height * 0.03),
                      left: height * 0.02,
                      borderRadius: height * 0.005,
                    }}>
                    <MyText label={`Rs.${dataItem.price}`} />
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
                          dataItem?.qty > 99
                            ? '99+'
                            : Number(dataItem.qty).toString()
                        }
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
