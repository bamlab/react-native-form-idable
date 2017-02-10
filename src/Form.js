// @flow

import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { isArray } from 'lodash';
import Toast from '@remobile/react-native-toast';

type _Props = {
  children: any,
  submitText: string,
  onSubmit: () => void,
  scrollable: boolean,
  showErrorsInToast: boolean,
  isLoading: boolean,
  fieldStyle: any,
}

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
});

class Form extends Component {
  inputs: Array<Object>;
  state: Object;
  submitButton: Object;
  static defaultProps = {
    submitText: 'validate',
    onSubmit: () => {},
  };

  constructor(props: _Props) {
    super(props);
    this.inputs = isArray(this.props.children) ? this.props.children : [this.props.children];
    this.setSubmitButton(props);

    this.state = this.inputs.reduce((formState, input) => ({
      ...formState,
      [input.props.name]: input.props.defaultValue,
    }), {});
  }

  setSubmitButton(props) {
    this.submitButton = React.cloneElement(props.children[props.children.length - 1], {
      onPress: () => this.onSubmit(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setSubmitButton(nextProps);
  }

  onSubmit() {
    const errorMessages = [];
    this.inputs.forEach((child) => {
      if (!child.props.name) return;
      const inputErrorMessage = this.refs[child.props.name].getValidationError();
      if (inputErrorMessage) {
        errorMessages.push({
          inputPlaceholder: child.props.placeholder,
          message: inputErrorMessage,
        });
      }
    });
    if (errorMessages.length === 0) return this.props.onSubmit(this.state);

    if (this.props.showErrorsInToast) {
      Toast.showLongTop(`${errorMessages[0].inputPlaceholder}: ${errorMessages[0].message}`);
    }
  }

  renderTextInputClone(input: any) {
    return React.cloneElement(input, {
      ref: input.props.name,
      showError: !this.props.showErrorsInToast,
      fieldStyle: this.props.fieldStyle,
      onChangeValue: (value) => {
        this.setState({
          ...this.state,
          [input.props.name]: value,
        });
      },
    });
  }

  renderButtonClone(button: any) {
    return this.submitButton;
  }

  renderForm() {
    return (
      <ScrollView ref="scrollView" scrollEnabled={false} keyboardShouldPersistTaps="always">
        {this.inputs.map((child, index) => {
          return (
            <View key={index}>
              { index === this.inputs.length - 1 ? this.renderButtonClone(child) : this.renderTextInputClone(child)}
            </View>
          );
        })}
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
