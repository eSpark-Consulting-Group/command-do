import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';
import {GapView, TouchRipple} from '../';
import {imagePicker} from '../../utils/helperFunctions';
import MyInput from '../MyInput';
import {PicBack} from '../../assets/images';

export default function ImageContainer({
  onImageChange = (image: object) => {},
  url = null,
}) {
  const [image, setImage] = useState<any>(url);
  const [load, setLoad] = useState<boolean>(false);
  const [showUrl, setShowUrl] = useState<boolean>(false);

  useEffect(() => {
    setImage(url);
  }, [url]);

  const onUploadImage = async () => {
    try {
      const result: any = await imagePicker();
      setImage(result);
      onImageChange(result);
      setLoad(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (image?.uri === '' || image?.uri === undefined) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, [image?.uri]);

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
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 10,
          }}>
          <Image
            source={load ? {uri: image?.uri} : PicBack}
            style={{height: '100%', width: '100%', borderRadius: 5}}
          />
        </View>
        <GapView mode="horizontal" />
        <View
          style={{
            flex: 1,
          }}>
          {showUrl ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MyInput
                value={image?.uri}
                handleChangeText={text => {
                  const Image = {uri: text};
                  setImage(Image);
                  onImageChange(Image);
                }}
              />
              <TouchRipple
                onPress={() => setShowUrl(false)}
                darkRipple
                style={styles.btnStyle}>
                <MyText
                  label={'Done'}
                  textStyle={{
                    color: colors.text_normal,
                    textAlignVertical: 'center',
                    paddingHorizontal: 10,
                  }}
                />
              </TouchRipple>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchRipple
                onPress={onUploadImage}
                darkRipple
                style={styles.btnStyle}>
                <MyText
                  label={'Upload Image'}
                  textStyle={{
                    color: colors.text_normal,
                    textAlignVertical: 'center',
                  }}
                />
              </TouchRipple>
              <MyText label="Or" size={14} />
              <TouchRipple
                onPress={() => setShowUrl(true)}
                darkRipple
                style={styles.btnStyle}>
                <MyText
                  label={'Set Image Url'}
                  textStyle={{
                    color: colors.text_normal,
                    textAlignVertical: 'center',
                  }}
                />
              </TouchRipple>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: 10,
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
