import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import useUpdateEffect from '../../utils/hooks/useUpdateEffect';
import {colors} from '../../theme';

const CstmDropDown = ({
  dataSource,
  handleLabel,
  type,
  toggleValue,
  handleToggle,
  defaultValue = null,
}: {
  dataSource: string[];
  handleLabel?: (value: string, type: string) => void;
  type: string;
  toggleValue: boolean;
  handleToggle?: (type: string) => void;
  defaultValue?: {name: string; id: number} | null;
}) => {
  const [label, setLabel] = useState<any>(null);

  useUpdateEffect(() => {
    handleLabel?.(label, type); //? to Send the Selected Label to parent
  }, [label]);

  const renderList = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: colors.primary}}
        onPress={() => {
          setLabel(item); //? to Change the Label of the Dropdown
          handleToggle?.(type); //? to Toggle the Dropdown
        }}>
        <View style={{...styles.itemContainer}}>
          <Text style={{color: colors.text_normal, ...styles.itemText}}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handleToggle?.(type)}>
        <View
          style={{
            borderColor: colors.primary,
            ...styles.dropdownLabelContainer,
          }}>
          <View style={styles.dropdownLabelInner}>
            <Text style={{color: colors.text_normal, ...styles.dropDownText}}>
              {!label?.name
                ? !defaultValue
                  ? 'Select an Item...'
                  : defaultValue?.name
                : label?.name}
            </Text>
            {toggleValue ? (
              <MI name="arrow-drop-up" color={colors.text_normal} size={22} />
            ) : (
              <MI name="arrow-drop-down" color={colors.text_normal} size={22} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {toggleValue && (
        <View
          style={{
            ...styles.dropDownContainer,
            borderColor: colors.primary,
          }}>
          <FlatList
            data={dataSource}
            renderItem={renderList}
            nestedScrollEnabled
          />
        </View>
      )}
      <View style={{height: 10}} />
    </View>
  );
};

export default CstmDropDown;
