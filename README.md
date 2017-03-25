# react-native-form-idable

## Installation

```
npm install --save react-native-form-idable
```

## Usage

```javascript
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Form, TextInput } from 'react-native-form-idable';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    padding: 24,
  },
});

const formStyles = {
  fieldContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
  },
  fieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  errorTextContainer: {
    height: 17,
    marginBottom: 10,
  },
  error: {
    color: 'white',
    fontSize: 10,
  },
};

class MyAwesomeForm extends Component {
  props: PropsType;

  render() {
    return (
      <View style={styles.container}>
        <Form
          formStyles={formStyles}
          onSubmit={formData => console.log(formData)}
          onValidationError={errors => console.log(errors)}
        >
          <TextInput
            name="email"
            placeholder="Email"
            type="email"
            required
          />
          <TextInput
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <TouchableOpacity type="submit">
            <Text>Submit</Text>
          </TouchableOpacity>
        </Form>
      </View>
    );
  }
 }

export default MyAwesomeForm;
```
