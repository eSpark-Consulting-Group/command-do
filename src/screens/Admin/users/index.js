import React, {useState} from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import {Divider, FAB} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLazyQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import {Icon as Icons} from '@rneui/themed';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import {
  BlurBackground,
  MyHeader,
  MyText,
  OverlayLoader,
  TouchRipple,
} from '../../../components';
import {colors} from '../../../theme';
import {profileData} from '../../../utils/data';
import {initialDataUpdate} from '../../../features/profile/profileSlice';
import {GET_ALL_USERS} from '../../../graphQL/query/user.query';
import {logout} from '../../../features/userInfo/userInfoSlice';

export default function Users() {
  const navigation = useNavigation();

  const [LoadAllUsers, {loading: userLoader, refetch, error}] = useLazyQuery(
    GET_ALL_USERS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [userList, setUserList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUsers();
      dispatch(initialDataUpdate(profileData));
    }, [refetch]),
  );

  const goToNavigation = navigate => {
    setIsModal(!isModal);
    navigation.navigate(navigate);
  };

  const getUsers = async () => {
    try {
      const getUsers = await LoadAllUsers();
      console.log('===>>', JSON.stringify(getUsers?.data?.getAllUsers?.data));
      const userData = getUsers?.data?.getAllUsers?.data.reduce((acc, curr) => {
        acc.push({
          title: curr.alphabet,
          data: curr.record,
        });
        return acc;
      }, []);

      setUserList(userData?.sort((a, b) => a?.title?.localeCompare(b?.title)));
    } catch (e) {
      console.log(
        'error while fetching',
        e?.sort((a, b) => a?.title?.localeCompare(b?.title)),
      );
    }
  };

  const logoutHandler = () => {
    setIsModal(!isModal);
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <OverlayLoader show={userLoader} />
      <MyHeader
        title="All Users"
        iconComponent={
          <Menu
            opened={isModal}
            onBackdropPress={() => setIsModal(false)}
            renderer={renderers.Popover}
            rendererProps={{
              placement: 'bottom',
            }}>
            <MenuTrigger
              children={
                <Icons
                  name={'user-circle-o'}
                  size={moderateVerticalScale(28)}
                  type={'font-awesome'}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: moderateVerticalScale(50),
                    width: moderateVerticalScale(50),
                  }}
                  containerStyle={{
                    borderRadius: 100,
                    alignSelf: 'center',
                  }}
                  pressableProps={{
                    android_ripple: {
                      borderless: true,
                      color: '#f5f5f533',
                    },
                  }}
                  color={colors.text_inverse}
                  onPress={() => setIsModal(!isModal)}
                />
              }
            />
            <MenuOptions customStyles={{optionsContainer: styles.modalInner}}>
              <MenuOption
                style={styles.buttonContainer}
                onSelect={() => goToNavigation('Profile')}
                children={
                  <>
                    <MCI
                      name="account"
                      size={moderateVerticalScale(20)}
                      color={colors.primary}
                      style={styles.btnIcon}
                    />
                    <MyText
                      label={'Profile'}
                      size={'title'}
                      textStyle={{color: colors.text_normal + '80'}}
                    />
                  </>
                }
              />
              <MenuOption
                style={styles.buttonContainer}
                onSelect={logoutHandler}
                children={
                  <>
                    <MCI
                      name="exit-to-app"
                      size={moderateVerticalScale(20)}
                      color={colors.primary}
                      style={styles.btnIcon}
                    />
                    <MyText
                      label={'Log out'}
                      size={'title'}
                      textStyle={{color: colors.text_normal + '80'}}
                    />
                  </>
                }
              />
            </MenuOptions>
          </Menu>
        }
      />
      <SectionList
        sections={userList ?? []}
        style={{paddingTop: 3}}
        renderItem={({item}) => {
          return (
            <>
              <TouchRipple
                darkRipple
                onPress={() => {
                  navigation.navigate('Add_Form_User', {
                    mode: 'edit',
                    userInfo: {id: item.id},
                  });
                }}>
                <MyText
                  textStyle={styles.item}
                  label={item.firstName + ' ' + item.lastName}
                />
              </TouchRipple>
              <Divider />
            </>
          );
        }}
        SectionSeparatorComponent={() => <Divider width={1} />}
        renderSectionHeader={({section: {title}}) => {
          return <Text style={styles.sectionHeader}>{title}</Text>;
        }}
        keyExtractor={(item, index) => index}
      />
      <FAB
        onPress={() =>
          navigation.navigate('Add_Form_User', {
            mode: 'add',
            userInfo: {id: null},
          })
        }
        icon={{
          name: 'add',
          color: colors.background,
        }}
        color={colors.primary}
        placement="right"
      />
      <BlurBackground show={isModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text_inverse,
    backgroundColor: colors.primary,
    elevation: 1,
  },
  item: {
    color: colors.text_normal,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modalInner: {
    width: moderateScale(150),
    backgroundColor: colors.background,
    borderRadius: moderateVerticalScale(5),
    zIndex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateVerticalScale(10),
  },
  btnIcon: {
    paddingRight: moderateScale(5),
    top: 1,
  },
});
