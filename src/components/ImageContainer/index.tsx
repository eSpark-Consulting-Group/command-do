import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';
import {TouchRipple} from '../';
import {imagePicker} from '../../utils/helperFunctions';
import {useState} from 'react';
import MyInput from '../MyInput';
import {useEffect} from 'react';
export default function ImageContainer({
  onImageChange = (image: object) => {},
  url = null,
}) {
  const [image, setImage] = useState<any>(url);

  useEffect(() => {
    setImage(url);
  }, [url]);

  const onUploadImage = async () => {
    try {
      const result: any = await imagePicker();
      setImage(result);
      onImageChange(result);
    } catch (error) {}
  };

  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
      <MyText
        label="Image"
        size={SCREEN_HEIGHT * 0.028}
        textStyle={{paddingBottom: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: 'teal',
            borderRadius: 5,
          }}>
          <Image
            source={{uri: image?.uri}}
            style={{height: '100%', width: '100%', borderRadius: 5}}
          />
        </View>
        <TouchRipple onPress={onUploadImage} darkRipple style={styles.btnStyle}>
          <MyText
            label={'Upload Image'}
            textStyle={{color: colors.text_normal, textAlignVertical: 'center'}}
          />
        </TouchRipple>
      </View>
      <MyText label="Or" size={SCREEN_HEIGHT * 0.028} textStyle={{top: 10}} />
      <MyInput
        label="Enter Image Url"
        value={image?.uri}
        handleChangeText={text => {
          const Image = {uri: text};
          setImage(Image);
          onImageChange(Image);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: 20,
    backgroundColor: colors.background,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
