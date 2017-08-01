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

const isInput = component => component.props.type && component.props.type !== SUBMIT_TYPE;

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

    this.setFormInputs(props);
    this.setInitialState();
    this.formStyles = merge({}, defaultStyles, props.formStyles);
  }

  setFormInputs(props: _Props) {
    this.inputs = isArray(props.children) ?
      props.children.filter(isInput) :
      [props.children]
    ;
  }

  setInitialState() {
    this.state = this.inputs.reduce((formState, input) => ({
      ...formState,
      [input.props.name]: input.props.defaultValue,
    }), {});
  }

  componentWillReceiveProps(nextProps: _Props) {
    this.setFormInputs(nextProps);
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
    const inputPosition = this.inputs.findIndex(otherInput => input.props.name === otherInput.props.name);
    const isLastInput = inputPosition === this.inputs.length - 1;

    return React.cloneElement(input, {
      ref: input.props.name,
      key: input.props.name,
      showError: !this.props.toastErrors,
      formStyles: this.formStyles,
      returnKeyType: isLastInput ? 'done' : 'next',
      onSubmitEditing: () => {
        if (isLastInput) {
          this.onSubmit();
          return;
        }

        const nextInput = this.inputs[inputPosition + 1];
        this.refs[nextInput.props.name].focus();
      },
      onChangeValue: (value) => {
        this.setState({
          ...this.state,
          [input.props.name]: value,
        });
      },
    });
  }

  renderChild = (child) => {
    if (child.props.type === SUBMIT_TYPE) {
      return React.cloneElement(child, { onPress: () => this.onSubmit(), key: 'submit' });
    }
    if (isInput(child)) return this.renderTextInputClone(child);

    return child;
  }

  render() {
    const children = isArray(this.props.children) ? this.props.children : [this.props.children];

    return (
      <View style={styles.scrollView}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="always">
        {
          children.map(this.renderChild)
        }
        </ScrollView>
      </View>
    );
  }
}

export default Form;
