// @flow

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import FormValidator from './FormValidator';

type _TextInputType =
  | 'name'
  | 'text'
  | 'email'
  | 'password'
  | 'digits';

type _Props = {
  name: string,
  onChangeValue: (value: string) => void,
  iconName: string,
  defaultValue: string,
  required: boolean,
  showError: boolean,
  type: _TextInputType,
  placeholder: string,
  label: string,
  disabled: boolean,
  refName: string,
  fieldStyle: any,
};

type _State = {
  text: ?string,
  errorMessage: ?string,
}

class FormidableTextInput extends Component {
  props: _Props;
  state: _State;

  static defaultProps = {
    showError: false,
  };

  constructor(props: _Props) {
    super(props);
    this.state = {
      errorMessage: null,
      text: this.props.defaultValue,
    };
  }

  onChangeText(text: string) {
    this.setState({
      text,
      errorMessage: null,
    });
    if (this.props.onChangeValue) this.props.onChangeValue(text);
  }

  onBlur() {
    this.getValidationError();
  }

  getValidationError() {
    const errorMessage = FormValidator.validate({
      ...this.props,
      text: this.state.text,
    });

    this.setState({ errorMessage });

    return errorMessage;
  }

  getTypeProps() {
    switch (this.props.type) {
      case 'name':
        return {
          autoCorrect: false,
        };
      case 'email':
        return {
          autoCorrect: false,
          keyboardType: 'email-address',
          autoCapitalize: 'none',
        };
      case 'password':
        return {
          autoCorrect: false,
          secureTextEntry: true,
        };
      case 'digits': {
        return {
          keyboardType: 'phone-pad',
        };
      }
      default:
        return {};
    }
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const { fieldStyle } = this.props;

    const containerStyle = [
      fieldStyle.fieldContainer,
      this.state.errorMessage ? fieldStyle.errorContainer : {},
    ];

    return (
      <View>
        {!!this.props.label &&
          <Text style={fieldStyle.inputLabel}>{ this.props.label }</Text>
        }
        <View style={containerStyle}>
          {
            // this.props.iconName ?
            //   <Icon name={this.props.iconName} size={iconSize} style={fieldStyle.icon} />
            //   : <View style={fieldStyle.iconPlaceholder} />
          }
          <TextInput
            onBlur={() => this.onBlur()}
            value={this.state.text || ''}
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
            {...this.getTypeProps()}
            {...this.props}
            onChangeText={(text) => this.onChangeText(text)}
            style={fieldStyle.fieldText}
            ref="input"
          />
        </View>
        {
          this.props.showError && (
            <View style={fieldStyle.errorTextContainer}>
              <Text style={fieldStyle.error}>{this.state.errorMessage}</Text>
            </View>
          )
        }
      </View>
    );
  }
}

export default FormidableTextInput;
