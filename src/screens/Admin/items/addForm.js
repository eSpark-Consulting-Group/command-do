import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

import {
  BottomButton,
  CstmDropDown,
  ImageContainer,
  MyHeader,
  MyInput,
  MySubHeader,
  OverlayLoader,
} from '../../../components';
import {colors} from '../../../theme';
import {uploadImage} from '../../../utils/helperFunctions';
import {GET_ALL_CATEGORIES} from '../../../graphQL/query/categories.query';
import {useEffect} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../../../graphQL/mutation/item.mutation';
import {showMessage} from 'react-native-flash-message';
import {
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../../graphQL/mutation/category.mutation';

export default function AddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {mode, type, itemData} = route?.params;

  console.log('ITEM DATA', itemData);

  const [catToggle, setCatToggle] = useState(false);
  const [fields, setFields] = useState({
    name: itemData?.name,
    price: itemData?.price?.toString(),
    image: itemData?.image,
  });
  const [selectedCategory, setSelectedCategory] = useState(itemData?.Category);

  const [LoadCategories, {data: categoryData}] = useLazyQuery(
    GET_ALL_CATEGORIES,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  const [AddNewItem, {loading: addItemLoading}] = useMutation(ADD_ITEM);
  const [UpdateItem, {loading: updateItemLoading}] = useMutation(UPDATE_ITEM);
  const [DeleteItem, {loading: deleteItemLoading}] = useMutation(DELETE_ITEM);

  const [AddNewCategory, {loading: addCategoryLoading}] =
    useMutation(ADD_NEW_CATEGORY);
  const [UpdateCategory, {loading: updateCategoryLoading}] =
    useMutation(UPDATE_CATEGORY);
  const [DeleteCategory, {loading: deleteCategoryLoading}] =
    useMutation(DELETE_CATEGORY);

  useEffect(() => {
    LoadCategories();
    setSelectedCategory(itemData?.Category);
  }, [isFocused]);

  const categories = categoryData?.getAllCategories?.data ?? [];
  const handleDeleteCategory = () => {
    Alert.alert('Delete Category', 'Category will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
        onPress: () => deleteCategory(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleDeleteItem = () => {
    Alert.alert('Delete Item', 'Item will be permenantly deleted.', [
      {
        text: 'Ok',
        style: 'default',
        onPress: () => deleteItem(itemData?.id),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  // ITEMS ACTIONS

  const addItem = async () => {
    if (!selectedCategory) {
      showMessage({message: 'Please select a category', type: 'error'});
      return;
    }
    const obj = {
      name: fields?.name,
      image:
        fields?.image?.uri?.slice(0, 4) == 'file'
          ? await uploadImage(fields?.image)
          : fields?.image,
      price: Number(fields?.price),
      categoryId: selectedCategory?.id,
    };
    AddNewItem({variables: obj})
      .then(res => {
        if (res?.data?.addNewItem?.status) {
          showMessage({
            message: res?.data?.addNewItem?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.addNewItem?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err, obj);
      });
  };

  const updateItem = async () => {
    const obj = {
      updateItemId: itemData?.id,
      name: fields?.name,
      image:
        fields?.image?.uri?.slice(0, 4) == 'file'
          ? await uploadImage(fields?.image)
          : fields?.image,
      price: Number(fields?.price),
      categoryId: selectedCategory?.id,
    };
    UpdateItem({variables: obj})
      .then(res => {
        if (res?.data?.updateItem?.status) {
          showMessage({
            message: res?.data?.updateItem?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.updateItem?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const deleteItem = id => {
    DeleteItem({
      variables: {
        deleteItemId: id,
      },
    })
      .then(res => {
        if (res?.data?.deleteItem?.status) {
          showMessage({
            message: res?.data?.deleteItem?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.deleteItem?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  // CATEGORIES ACTIONS
  const addCategory = async () => {
    AddNewCategory({
      variables: {
        name: fields?.name,
        image:
          fields?.image?.uri?.slice(0, 4) == 'file'
            ? await uploadImage(fields?.image)
            : fields?.image,
      },
    })
      .then(res => {
        if (res?.data?.addNewCategory?.status) {
          showMessage({
            message: res?.data?.addNewCategory?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.addNewCategory?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err, obj);
      });
  };

  const updateCategory = async () => {
    UpdateCategory({
      variables: {
        updateCategoryId: itemData?.id,
        name: fields?.name,
        image:
          fields?.image?.uri?.slice(0, 4) == 'file'
            ? await uploadImage(fields?.image)
            : fields?.image,
      },
    })
      .then(res => {
        if (res?.data?.updateCategory?.status) {
          showMessage({
            message: res?.data?.updateCategory?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.updateCategory?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const deleteCategory = async () => {
    DeleteCategory({
      variables: {
        deleteCategoryId: itemData?.id,
      },
    })
      .then(res => {
        if (res?.data?.deleteCategory?.status) {
          showMessage({
            message: res?.data?.deleteCategory?.message,
            type: 'success',
          });
          navigation?.goBack();
        } else {
          showMessage({
            message: res?.data?.deleteCategory?.message,
            type: 'danger',
          });
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  if (mode === 'add') {
    {
      //! Add Category
    }
    if (type === 'category') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <OverlayLoader show={addCategoryLoading} />
          <MyHeader
            title="Add Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Add Category Details" />
            <MyInput
              label="Name"
              handleChangeText={text => {
                setFields({...fields, name: text});
              }}
            />
            <ImageContainer
              onImageChange={image => {
                setFields({...fields, image: image});
              }}
            />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Add Category"
              count={Object.values(fields).filter(val => Boolean(val))?.length}
              totalCount={2}
              enabled={
                Object.values(fields).filter(val => Boolean(val))?.length == 2
              }
              onPress={() => addCategory()}
            />
          </View>
        </View>
      );
    }
    {
      //! Add Item
    }
    if (type === 'item') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <OverlayLoader show={addItemLoading} />
          <MyHeader
            title="Add Item"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Select Category" divider />
            <CstmDropDown
              dataSource={categories}
              toggleValue={catToggle}
              type="category"
              handleToggle={() => setCatToggle(!catToggle)}
              handleLabel={value => setSelectedCategory(value)}
            />
            <MySubHeader title="Add Item Details" divider />
            <MyInput
              label="Name"
              handleChangeText={text => {
                setFields({...fields, name: text});
              }}
            />
            <MyInput
              label="Price"
              handleChangeText={text => {
                setFields({...fields, price: text});
              }}
            />
            <ImageContainer
              onImageChange={image => {
                setFields({...fields, image: image});
              }}
            />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Add An Item"
              count={Object.values(fields).filter(val => Boolean(val))?.length}
              totalCount={3}
              enabled={
                Object.values(fields).filter(val => Boolean(val))?.length == 3
              }
              onPress={() => addItem()}
            />
          </View>
        </View>
      );
    }
  }
  {
    //! Edit Category
  }
  if (mode === 'edit') {
    if (type === 'category') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <OverlayLoader
            show={updateCategoryLoading || deleteCategoryLoading}
          />
          <MyHeader
            title="Edit Category"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
            rightIconType="foundation"
            icon="trash"
            onPressRight={() => handleDeleteCategory()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Edit Category Details" />
            <MyInput
              label="Name"
              value={fields.name}
              handleChangeText={text => {
                setFields({...fields, name: text});
              }}
            />
            <ImageContainer
              url={fields?.image?.uri ? fields?.image : {uri: fields?.image}}
              onImageChange={image => {
                setFields({...fields, image: image});
                // uploadImage(image).then(fireUrl =>
                // );
              }}
            />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Edit Category"
              count={Object.values(fields).filter(val => Boolean(val))?.length}
              totalCount={2}
              enabled={
                Object.values(fields).filter(val => Boolean(val))?.length == 2
              }
              onPress={() => updateCategory()}
            />
          </View>
        </View>
      );
    }
    {
      //! Edit Item
    }
    if (type === 'item') {
      return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
          <OverlayLoader show={updateItemLoading || deleteItemLoading} />
          <MyHeader
            title="Edit Item"
            leftIcon="arrow-back"
            onPressLeft={() => navigation.goBack()}
            rightIconType="foundation"
            icon="trash"
            onPressRight={() => handleDeleteItem()}
          />
          <ScrollView style={{paddingHorizontal: 10}}>
            <MySubHeader title="Select Category" divider />
            <CstmDropDown
              defaultValue={itemData?.Category}
              dataSource={categories}
              toggleValue={catToggle}
              handleLabel={value => setSelectedCategory(value)}
              type="category"
              handleToggle={() => setCatToggle(!catToggle)}
            />
            <MySubHeader title="Edit Item Details" divider />
            <MyInput
              label="Name"
              value={fields.name}
              handleChangeText={text => {
                setFields({...fields, name: text});
              }}
            />
            <MyInput
              label="Price"
              value={fields.price}
              handleChangeText={text => setFields({...fields, price: text})}
            />
            <ImageContainer
              url={fields?.image?.uri ? fields?.image : {uri: fields?.image}}
              onImageChange={image => {
                setFields({...fields, image: image});
                // uploadImage(image).then(fireUrl =>
                // );
              }}
            />
          </ScrollView>
          <View style={{height: 60}}>
            <BottomButton
              label="Edit Item"
              count={Object.values(fields).filter(val => Boolean(val))?.length}
              totalCount={3}
              enabled={
                Object.values(fields).filter(val => Boolean(val))?.length == 3
              }
              onPress={() => updateItem()}
            />
          </View>
        </View>
      );
    }
  }
}
