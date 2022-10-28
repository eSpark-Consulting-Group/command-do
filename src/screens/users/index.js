import {useNavigation, useRoute} from '@react-navigation/native';
import {Divider} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import {MyHeader, MyText} from '../../components';
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
        renderItem={({item}) => (
          <View>
            <MyText textStyle={styles.item} label={item} />
            <Divider color={colors.background} />
          </View>
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
    backgroundColor: colors.primary,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: '#ffffff',
    elevation: 1,
  },
  item: {
    color: colors.text_inverse,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
