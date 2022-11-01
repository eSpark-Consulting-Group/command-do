import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-ranges';
import moment from 'moment';

import {GapView, MyHeader, MyText, TouchRipple} from '../../components';
import {colors} from '../../theme';
import useUpdateEffect from '../../utils/hooks/useUpdateEffect';

export default function FilterScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  const [dateState, setDateState] = useState({
    startDate: null,
    endDate: null,
    date: moment(),
  });

  useUpdateEffect(() => {
    if (route.params !== undefined) {
      console.log('kuch ha', route.params);
      getUserSelected(route.params.userList);
    }
  }, [route.params]);

  const getUserSelected = userList => {
    let tempArr = [...orderFilterFields];
    let newArr = userList.filter(item => item.selected == true);
    if (newArr[0].label === 'No User') {
      tempArr[1].label = 'Select User';
    } else {
      tempArr[1].label = newArr[0].label;
    }
    setOrderFilterFields(tempArr);
  };

  const setSelectedDate = dateString => {
    let tempArr = [...orderFilterFields];
    tempArr[0].label = dateString;
    setOrderFilterFields(tempArr);
  };

  const [orderFilterFields, setOrderFilterFields] = useState([
    {
      label: 'Select Date/Range',
      onPress: () => {
        setShow(!show);
      },
    },
    {
      label: 'Select User',
      onPress: () => handleSecondField(),
    },
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    console.log('Selected date is:', currentDate);
    console.log(
      '🚀 ~ file: Filters.js ~ line 54 ~ onChange ~ currentDate.toLocaleString',
      currentDate.toDateString(),
    );
    setSelectedDate(currentDate.toDateString());
    setDate(currentDate);
  };

  const handleSecondField = () => {
    navigation.navigate('UserList');
  };

  const handlePassValue = () => {
    return true;
  };

  return (
    <View style={styles.container}>
      <MyHeader
        title="Filters"
        icon="checkmark"
        rightIconType="ionicon"
        leftIcon="filter-remove-outline"
        leftIconType="material-community"
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />
      <DatePicker
        style={{display: 'none'}}
        isVisible={show}
        onConfirm={value => setShow(false)}
        customStyles={{
          placeholderText: {fontSize: 20}, // placeHolder style
          headerStyle: {}, // title container style
          headerMarkTitle: {}, // title mark style
          headerDateTitle: {}, // title Date style
          contentInput: {}, //content text container style
          contentText: {}, //after selected text Style
        }} // optional
        centerAlign // optional text will align center or not
        allowFontScaling={false} // optional
        placeholder={'Apr 27, 2018 → Jul 10, 2018'}
        mode={'range'}
      />
      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
          accentColor={colors.primary}
        />
      )} */}
      <FlatList
        data={orderFilterFields}
        style={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <TouchRipple
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                paddingVertical: 20,
              }}
              darkRipple
              onPress={item.onPress}>
              <MyText
                label={item.label}
                textStyle={{textAlignVertical: 'center'}}
                size={16}
              />
              <Icon
                name={'chevron-right'}
                color={colors.primary}
                size={20}
                iconStyle={{marginRight: 5}}
              />
            </TouchRipple>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    // marginTop: 5,
    // backgroundColor: 'teal',
  },
  listItem: {
    backgroundColor: '#fff',
    elevation: 3,
    marginVertical: 8,
  },
});
