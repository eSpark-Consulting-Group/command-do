import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Divider, FAB} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';

import {MyHeader, MyText, TouchRipple} from '../../components';
import {colors} from '../../theme';

export default function Users() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <MyHeader
        title="All Users"
        icon="add"
        onPressRight={() => navigation.navigate('Add_Form_User', {mode: 'add'})}
      />
      <SectionList
        sections={[
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
            data: [
              'CARTEL',
              'CASTLE OF EVIL',
              'CHANCE',
              'COP GAME',
              'CROSS FIRE',
            ],
          },
        ]}
        style={{paddingTop: 3}}
        renderItem={({item}) => (
          <>
            <TouchRipple
              darkRipple
              onPress={() => {
                navigation.navigate('Add_Form_User', {mode: 'edit'});
              }}>
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
      <FAB
        onPress={() => console.log('s')}
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
});
