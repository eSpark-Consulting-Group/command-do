import React, {useState} from 'react';
import {
  LayoutAnimation,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

import {
  CustomizeModal,
  GapView,
  MyHeader,
  MyText,
  TouchRipple,
} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {colors} from '../../theme';

export default function OrdersList() {
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState(false);
  const [filterLabel, setFilterLabel] = useState('By Date');

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

  return (
    <View style={styles.container}>
      <MyHeader
        title="All Orders"
        icon="filter"
        rightIconType="antdesign"
        onPressRight={() => {
          navigation.navigate('Filters');
        }}
      />
      <GapView length={4} mode="vertical" />
      <SectionList
        sections={[
          {
            title: '29 October 2022',
            data: ['ALTERED'],
          },
          {
            title: '30 October 2022',
            data: ['BEST MEN'],
          },
          {
            title: '31 October 2022',
            data: ['CARTEL'],
          },
        ]}
        renderItem={({item}) => (
          <>
            <TouchRipple darkRipple onPress={() => {}}>
              <MyText textStyle={styles.item} label={item} />
            </TouchRipple>
            <Divider />
          </>
        )}
        SectionSeparatorComponent={() => <Divider width={1} />}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    backgroundColor: colors.primary,
    padding: 8,
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
  },
  outlineBtn: {
    flexDirection: 'row',
    width: '40%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 100,
    elevation: 2,
    paddingHorizontal: 10,
  },
  modalInner: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: SCREEN_HEIGHT * 0.005,
    zIndex: 1,
    top: SCREEN_HEIGHT * 0.13,
    left: SCREEN_HEIGHT * 0.19,
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
});
