# react-native-form-idable

## Installation

```
npm install --save react-native-form-idable
```

## Usage

```javascript
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, TextInput } from 'react-native-form-idable';
import { Button } from 'homefriend/src/components';
import appStyle from 'homefriend/src/appStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyle.colors.primary,
    flex: 1,
    padding: appStyle.margins.l,
  },
});

const fieldStyle = StyleSheet.create({
  fieldContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: appStyle.input.backgroundColor,
    alignItems: 'center',
    height: appStyle.dimensions.touchableHeight,
  },
  fieldText: {
    color: appStyle.colors.secondary,
    flex: 1,
    fontSize: appStyle.font.sizes.small,
    fontWeight: '600',
    paddingHorizontal: appStyle.input.paddingHorizontal,
  },
  errorTextContainer: {
    height: 17,
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: appStyle.margins.m,
  },
  error: {
    color: appStyle.font.colors.white,
    fontSize: appStyle.font.sizes.xxs,
  },
});

class MyAwesomeForm extends Component {
  props: PropsType;

  render() {
    return (
      <View style={styles.container}>
        <Form
          fieldStyle={fieldStyle}
          onSubmit={formData => console.log(formData)}
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
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </View>
    );
  }
 }

export default MyAwesomeForm;
```
