import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {SCREEN_HEIGHT} from '../../constants';
import {colors} from '../../theme';
import MyText from '../Text';
import {GapView, TouchRipple} from '../';
import {imagePicker} from '../../utils/helperFunctions';
import MyInput from '../MyInput';
import {PicBack} from '../../assets/images';
import {moderateVerticalScale} from 'react-native-size-matters';

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
    console.log('bta image kia', image?.uri, image?.uri == '');
    if (
      image?.uri === '' ||
      image?.uri === undefined ||
      image?.uri?.uri === ''
    ) {
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
            height: moderateVerticalScale(80),
            width: moderateVerticalScale(80),
            borderWidth: 2,
            borderColor: colors.primary,
          }}>
          <Image
            source={load ? {uri: image?.uri} : PicBack}
            style={{height: '100%', width: '100%'}}
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
              <View
                style={{
                  ...styles.btnStyle,
                  marginHorizontal: 10,
                  height: moderateVerticalScale(40),
                }}>
                <TouchRipple
                  onPress={() => setShowUrl(false)}
                  darkRipple
                  style={{
                    height: 'auto',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MyText
                    label={'Done'}
                    textStyle={{
                      color: colors.text_normal,
                      textAlignVertical: 'center',
                    }}
                  />
                </TouchRipple>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.btnStyle}>
                <TouchRipple onPress={onUploadImage} darkRipple>
                  <MyText
                    label={'Upload Image'}
                    size={'title'}
                    textStyle={{
                      color: colors.text_normal,
                      textAlignVertical: 'center',
                    }}
                  />
                </TouchRipple>
              </View>
              <MyText
                label="Or"
                size={12}
                textStyle={{marginHorizontal: 8, opacity: 0.6}}
              />
              <View style={styles.btnStyle}>
                <TouchRipple onPress={() => setShowUrl(true)} darkRipple>
                  <MyText
                    label={'Set Image Url'}
                    size={'title'}
                    textStyle={{
                      color: colors.text_normal,
                      textAlignVertical: 'center',
                    }}
                  />
                </TouchRipple>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
