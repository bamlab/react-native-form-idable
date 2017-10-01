import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatePicker, Picker, Form, TextInput } from 'react-native-form-idable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
  form: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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

export default class FormidableExample extends Component {
  onSubmit = formData => console.log(formData);

  render() {
    return (
      <View style={styles.container}>
        <Form
          formStyles={formStyles}
          onSubmit={this.onSubmit}
          toastErrors
          style={styles.form}
          onValidationError={errors => console.log(errors)}
        >
          <TextInput name="email" placeholder="Email" type="email" required />
          <Picker name="language" type="language" placeholder="Language" formStyles={formStyles}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="French" value="fr" />
          </Picker>
          <DatePicker
            name="birthdate"
            type="date"
            placeholder="Birthdate"
            minimumDate={new Date(1992, 7, 17)}
            date={new Date(2017, 8, 1)}
            maximumDate={new Date(2017, 8, 10)}
          />
          <DatePicker
            format={'HH:mm'}
            name="hour"
            type="date"
            placeholder="Hour"
            mode="time"
            androidMode="calendar"
            is24Hour
            minuteInterval={30}
            timeZoneOffsetInMinutes={-7 * 60}
            date={new Date(2017, 8, 1, 14, 54)}
          />
          <DatePicker
            format={'D MMMM YYYY HH:mm'}
            name="datetime"
            type="datetime"
            placeholder="Datetime"
            mode="datetime"
            androidMode="calendar"
            date={new Date(2017, 8, 1, 14, 54)}
          />
          <TextInput name="password" placeholder="Password" type="password" required />
          <TouchableOpacity type="submit" style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Form>
      </View>
    );
  }
}
