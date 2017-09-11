/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatePicker, Picker, Form, TextInput } from 'react-native-form-idable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    minHeight: 40,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

const formStyles = {
  fieldContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fieldText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
};

export default class MyAwesomeForm extends Component {
  static navigationOptions = {
    title: 'For me for me daaaable',
  };

  props: PropsType;

  render() {
    return (
      <View style={styles.container}>
        <Form
          formStyles={formStyles}
          onSubmit={formData => alert(JSON.stringify(formData, null, 2))}
          toastErrors
          onValidationError={errors => console.log(errors)}
        >
          <TextInput name="email" placeholder="Email" type="email" required />
          <Picker name="language" type="language" placeholder="Language" formStyles={formStyles}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="French" value="fr" />
          </Picker>
          <DatePicker name="birthdate" type="date" placeholder="Birthdate" />
          <TextInput name="password" placeholder="Password" type="password" required />
          <TouchableOpacity type="submit" style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Form>
      </View>
    );
  }
}
