# react-native-form-idable

## Installation

```
yarn add react-native-form-idable
```

## Features

- Sets input props based on the type you pass it. For instance, `type="email"` implies `autocorrect="false"`
- Automatically adds a submit function
- Validation available out of the box but highly customizable
- Native-like DatePicker with same API for both Android & iOS
- Highly customizable components and validation with React Native like API

## Usage

This is a minimal example:
```javascript
import { Form, TextInput } from 'react-native-form-idable';

...

<Form
  formStyles={formStyles}
  toastErrors
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
```

In the example above, if the inputs are filled, when pressing on the buttons, the `onSubmit` prop will be called with
```
{
  email: "react-native@formidab.le",
  password: "very secure password"
}
```

How it works:
- The `Form` component wraps the inputs and handles the logic
- **One of the direct child should have a `type="submit"` prop.** The form will add an `onPress` prop on it, which will call the `onSubmit` prop with the `formData` when clicking

### Styling the form

**The styles are passed through the `formStyles` prop.** Here are the available style props:

- **inputContainerStyle:** style applied to the global container (View)
- **nonEditableInput:** style applied to the global container when TextInput is not editable
- **inputLabelContainer:** style applied to the label container (View)
- **inputLabel:** style applied to the text label (Text)
- **activeInputLabel:** style applied to the text label when focused or filled (Text)
- **fieldContainer:** style applied to the field container (View)
- **activeFieldContainer:** style applied to the field container when focused (View)
- **validFieldContainer:** style applied to the field container when filled with valid info (View)
- **fieldText:** style applied to the input (TextInput)
- **activeFieldText:** style applied to the input when focused (TextInput)
- **validFieldText:** style applied to the input when filled with valid info (TextInput)
- **errorTextContainer:** style applied to the error container (View)
- **placeholderAndSelectionColors:** color of the selection bar and of the placeholder
- **activePlaceholderAndSelectionColors:** color of the selection bar and of the placeholder when focused or filled
- **error:** style applied to the error text (Text)

## Expo Example

There's an expo example available in `./example`.

You can [try out the published version](https://exp.host/@almouro/example) with the Expo app.

## More advanced example

```javascript
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
