// @flow

import React, { Component } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { isArray, merge } from 'lodash';
import Toast from 'react-native-root-toast';
import defaultStyles from './defaultStyles';

type _ValidationError = {
  input: any,
  message: string,
}

type _Props = {
  children: any,
  submitText: string,
  onSubmit: () => void,
  scrollable: boolean,
  toastErrors: boolean,
  isLoading: boolean,
  formStyles: any,
  onValidationError: () => _ValidationError[],
}

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
});

const SUBMIT_TYPE = 'submit';

class Form extends Component {
  inputs: Array<Object>;
  state: Object;
  submitButton: Object;
  formStyles: Object;

  static defaultProps = {
    submitText: 'validate',
    onSubmit: () => {},
  };

  constructor(props: _Props) {
    super(props);

    this.setFormInputs();
    this.setSubmitButton(props);
    this.setInitialState();
    this.formStyles = merge({}, defaultStyles, props.formStyles);
  }

  setFormInputs() {
    this.inputs = isArray(this.props.children) ?
      this.props.children.filter(child => child.props.type !== SUBMIT_TYPE) :
      [this.props.children]
    ;
  }

  setInitialState() {
    this.state = this.inputs.reduce((formState, input) => ({
      ...formState,
      [input.props.name]: input.props.defaultValue,
    }), {});
  }

  setSubmitButton(props: _Props) {
    const submitButton = props.children.find(child => child.props.type === SUBMIT_TYPE);
    this.submitButton = React.cloneElement(submitButton, {
      onPress: () => this.onSubmit(),
    });
  }

  componentWillReceiveProps(nextProps: _Props) {
    this.setSubmitButton(nextProps);
  }

  onSubmit() {
    const errorMessages: _ValidationError[] = [];

    this.inputs.forEach((child) => {
      if (!child.props.name) return;
      const inputErrorMessage = this.refs[child.props.name].getValidationError();

      if (inputErrorMessage) {
        errorMessages.push({
          input: child,
          message: inputErrorMessage,
        });
      }
    });

    if (errorMessages.length === 0) {
      Keyboard.dismiss();
      return this.props.onSubmit(this.state);
    }

    if (this.props.toastErrors) {
      Toast.show(`${errorMessages[0].input.props.placeholder}: ${errorMessages[0].message}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }

    if (this.props.onValidationError) {
      this.props.onValidationError(errorMessages);
    }
  }

  renderTextInputClone(input: any) {
    return React.cloneElement(input, {
      ref: input.props.name,
      key: input.props.name,
      showError: !this.props.toastErrors,
      formStyles: this.formStyles,
      onChangeValue: (value) => {
        this.setState({
          ...this.state,
          [input.props.name]: value,
        });
      },
    });
  }

  renderForm() {
    return (
      <ScrollView ref="scrollView" scrollEnabled={false} keyboardShouldPersistTaps="always">
        {this.inputs.map(child => this.renderTextInputClone(child))}
        { this.submitButton }
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.scrollView}>
        { this.renderForm() }
      </View>
    );
  }
}

export default Form;
