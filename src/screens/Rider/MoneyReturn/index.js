import React, {useState} from 'react';
import {View} from 'react-native';

import {MoneyReturnCard, MyText} from '../../../components';
import {SCREEN_WIDTH} from '../../../constants';
import {colors} from '../../../theme';

export default function MoneyReturn({navigation}) {
  const [filePath, setFilePath] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          width: SCREEN_WIDTH,
          padding: 10,
          paddingHorizontal: 15,
          elevation: 5,
          borderRadius: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
        }}>
        <MyText
          label={'Return Money'}
          size={'subHeading'}
          textStyle={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif-medium',
            textAlignVertical: 'center',
            color: colors.text_inverse,
          }}
        />
      </View>

      <MoneyReturnCard
        name={'Wirad Ali'}
        amount={220}
        // order={item.OrderItems}
        // paid={item.status}
        onRevert={() => revertConfirmation(item.id)}
      />
    </View>
  );
}
