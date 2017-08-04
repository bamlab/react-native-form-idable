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

## Contributing

Commits follow the Angular commit convention to create releases automatically.

To help you out, you can run
```
yarn
yarn commit
```
in the repo

### Creating releases

commitizen uses semantic-release to release new versions automatically.

Commits of type fix will trigger bugfix releases, think 0.0.1
Commits of type feat will trigger feature releases, think 0.1.0
Commits with BREAKING CHANGE in body or footer will trigger breaking releases, think 1.0.0
All other commit types will trigger no new release.

## CSS properties of the formStyles Object

**inputLabelContainer:** style applied to the label container (View)
**inputLabel:** style applied to the text label (Text)
**activeInputLabel:** style applied to the text label when focused or filled (Text)
**fieldContainer:** style applied to the field container (View)
**activeFieldContainer:** style applied to the field container when focused or filled (View)
**fieldText:** style applied to the input (TextInput)
**activefieldText:** style applied to the input when focused or filled (TextInput)
**errorTextContainer:** style applied to the error container (View)
**placeholderAndSelectionColors:** color of the selection bar and of the placeholder
**activePlaceholderAndSelectionColors:** color of the selection bar and of the placeholder when focused or filled
**error:** style applied to the error text (Text)
