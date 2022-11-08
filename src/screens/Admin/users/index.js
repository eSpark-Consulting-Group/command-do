import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {Divider, FAB} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLazyQuery} from '@apollo/client';

import {
  CustomizeModal,
  MyHeader,
  MyText,
  OverlayLoader,
  TouchRipple,
} from '../../../components';
import {colors} from '../../../theme';
import {profileData} from '../../../utils/data';
import {initialDataUpdate} from '../../../features/profile/profileSlice';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import {GET_ALL_USERS} from '../../../graphQL/query/user.query';
import {getAllUsers, logout} from '../../../features/userInfo/userInfoSlice';

const sampleData = [
  {
    title: 'A',
    data: ['ALTERED', 'ABBY', 'ACTION U.S.A.', 'AMUCK', 'ANGUISH'],
  },
  {
    title: 'B',
    data: [
      'BEST MEN',
      'BEYOND JUSTICE',
      'BLACK GUNN',
      'BLOOD RANCH',
      'BEASTIES',
    ],
  },
  {
    title: 'C',
    data: ['CARTEL', 'CASTLE OF EVIL', 'CHANCE', 'COP GAME', 'CROSS FIRE'],
  },
];

export default function Users() {
  const navigation = useNavigation();
  const route = useRoute();

  const [LoadAllUsers, {loading: userLoader}] = useLazyQuery(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const reduxData = useSelector(store => store);
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers();
    dispatch(initialDataUpdate(profileData));
  }, []);

  const isModalVisible = () => {
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
    setIsModal(!isModal);
  };

  const goToNavigation = navigate => {
    navigation.navigate(navigate);
    setIsModal(!isModal);
  };

  const getUsers = async () => {
    try {
      const getUsers = await LoadAllUsers();
      console.log('===>>', JSON.stringify(getUsers?.data?.getAllUsers?.data));
      dispatch(getAllUsers(getUsers?.data?.getAllUsers?.data));
      const userData = getUsers?.data?.getAllUsers?.data.reduce((acc, curr) => {
        acc.push({
          title: curr.alphabet,
          data: curr.record,
        });
        return acc;
      }, []);
      setUserList(userData);
      console.log('reduxData', reduxData?.userInfo?.userData);
    } catch (e) {
      console.log('error while fetching', e);
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <OverlayLoader show={userLoader} />
      <CustomizeModal
        isVisible={isModal}
        setBackDrop={isModalVisible}
        navigation={navigation}
        renderData={
          <View style={styles.modalInner}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => goToNavigation('Profile')}>
              <Ionicons
                name="person"
                size={SCREEN_HEIGHT * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Profile'}
                title
                textStyle={{color: colors.text_normal}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {borderBottomWidth: SCREEN_HEIGHT * 0},
              ]}
              onPress={() => logoutHandler()}>
              <Ionicons
                name="ios-exit"
                size={SCREEN_HEIGHT * 0.025}
                color={colors.primary}
                style={styles.btnIcon}
              />
              <MyText
                label={'Log out'}
                title
                textStyle={{color: colors.text_normal}}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <MyHeader
        title="All Users"
        icon="user-circle-o"
        rightIconType="font-awesome"
        onPressRight={() => setIsModal(true)}
      />
      <SectionList
        sections={userList ?? []}
        style={{paddingTop: 3}}
        renderItem={({item}) => {
          console.log('item', item);
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
        onPress={() => navigation.navigate('Add_Form_User', {mode: 'add'})}
        icon={{
          name: 'add',
          color: colors.background,
        }}
        color={colors.primary}
        placement="right"
      />
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
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: SCREEN_HEIGHT * 0.005,
    zIndex: 1,
    top: SCREEN_HEIGHT * 0.03,
    right: SCREEN_HEIGHT * 0.03,
    elevation: SCREEN_HEIGHT * 0.003,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SCREEN_HEIGHT * 0.01,
    borderBottomWidth: SCREEN_HEIGHT * 0.0005,
    borderBottomColor: '#00000050',
  },
  btnIcon: {
    paddingRight: SCREEN_HEIGHT * 0.01,
  },
});
