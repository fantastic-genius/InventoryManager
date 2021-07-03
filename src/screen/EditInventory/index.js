import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CommonActions} from '@react-navigation/native';

//constants
import colors from '../../constants/colors';

//crud
import {updateInventory, inventoryNameExist, deleteInventory} from '../../crud';

const EditInventory = ({navigation, route}) => {
  const formikRef = useRef();
  const descriptionRegex = /^\S+\s+\S+\s+\S+/;
  const {inventory} = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Name is required'),
    description: Yup.string()
      .trim()
      .required('description is required')
      .matches(descriptionRegex, 'description must have at least three words'),
    price: Yup.number()
      .positive('price must be a positive value')
      .required('price is required'),
    stock: Yup.number()
      .positive('stock must be a positive value')
      .required('stock is required'),
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this inventory",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            deleteInventory(inventory.uuid);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollCon}>
        <Formik
          initialValues={{
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            stock: inventory.stock,
          }}
          onSubmit={async (values, {setSubmitting}) => {
            const nameExists = await inventoryNameExist(values.name, inventory.uuid);
            if (nameExists) {
              if (formikRef.current) {
                formikRef.current.setFieldError('name', 'Name must be unique');
              }
              return;
            }
            await updateInventory(inventory.uuid, values);
            setSubmitting(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
            );
          }}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            handleBlur,
          }) => (
            <View style={styles.formCon}>
              <View style={styles.inputCon}>
                <TextInput
                  name="name"
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor={colors.LIGHTGRAY}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  maxLength={30}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
              <View style={styles.inputCon}>
                <TextInput
                  name="description"
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor={colors.LIGHTGRAY}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  multiline
                  numberOfLines={3}
                  maxLength={100}
                />
                {errors.description && touched.description ? (
                  <Text style={styles.errorText}>{errors.description}</Text>
                ) : null}
              </View>
              <View style={styles.inputCon}>
                <TextInput
                  name="price"
                  style={styles.input}
                  placeholder="Price"
                  placeholderTextColor={colors.LIGHTGRAY}
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                />
                {errors.price && touched.price ? (
                  <Text style={styles.errorText}>{errors.price}</Text>
                ) : null}
              </View>
              <View style={styles.inputCon}>
                <TextInput
                  name="stock"
                  style={styles.input}
                  placeholder="Stock"
                  placeholderTextColor={colors.LIGHTGRAY}
                  value={values.stock}
                  onChangeText={handleChange('stock')}
                  onBlur={handleBlur('stock')}
                />
                {errors.stock && touched.stock ? (
                  <Text style={styles.errorText}>{errors.stock}</Text>
                ) : null}
              </View>
              <View style={styles.btnCon}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={handleDelete}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  scrollCon: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    flex: 1,
    color: colors.MEDIUMGRAY,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
    fontSize: 16,
    borderRadius: 10,
  },
  inputCon: {
    marginBottom: 16,
  },
  formCon: {
    paddingVertical: 20,
  },
  addBtn: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    marginTop: 24,
    width: '45%',
    alignSelf: 'flex-start',
  },
  btnText: {
    fontSize: 16,
    color: colors.WHITE,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: colors.DANGER,
    marginTop: 5,
  },
  deleteBtn: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: colors.DANGER,
    borderRadius: 10,
    marginTop: 24,
    width: '45%',
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditInventory;
