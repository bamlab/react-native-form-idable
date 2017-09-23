// @flow

import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import FormValidator from './FormValidator';
import InputContainer from './InputContainer';

type _TextInputType = 'name' | 'text' | 'email' | 'password' | 'digits';

type _Props = {
  name: string,
  onChangeText: (value: string) => void,
  getErrorMessage: (error: _Error) => string,
  iconName: string,
  defaultValue: string,
  required: boolean,
  showError: boolean,
  customErrorMessage: string,
  type: _TextInputType,
  placeholder: string,
  label: string,
  refName: string,
  formStyles: any,
  onFocus: () => void,
  onBlur: () => void,
};

type _State = {
  text: ?string,
  errorMessage: ?string,
  isFocused: boolean,
  isActive: boolean,
};

class FormidableTextInput extends PureComponent {
  props: _Props;
  state: _State;

  static defaultProps = {
    showError: false,
    customErrorMessage: '',
    onFocus: () => {},
    onBlur: () => {},
    onChangeText: () => {},
    getErrorMessage: () => {},
    defaultValue: '',
  };

  constructor(props: _Props) {
    super(props);
    this.state = {
      errorMessage: null,
      text: this.props.defaultValue,
      isFocused: false,
      isActive: false,
    };
  }

  onChangeText(text: string) {
    this.setState({
      text,
      errorMessage: null,
    });
    this.props.onChangeText(text);
  }

  onBlur() {
    this.setState({ isFocused: false });
    this.getValidationError();
    this.props.onBlur();
  }

  onFocus() {
    this.setState({ isFocused: true });
    this.props.onFocus();
  }

  getValidationError() {
    const error = FormValidator.validate({
      ...this.props,
      text: this.state.text,
    });

    if (error) {
      this.setState({ errorMessage: this.props.getErrorMessage(error) });
    }

    return error;
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
    const { formStyles } = this.props;
    const isInputActive = this.state.isFocused;

    const fieldTextStyle = [formStyles.fieldText, isInputActive && formStyles.activefieldText];
    const placeholderAndSelectionColors = isInputActive
      ? formStyles.activePlaceholderAndSelectionColors || formStyles.placeholderAndSelectionColors
      : formStyles.placeholderAndSelectionColors;

    return (
      <InputContainer {...this.props} active={isInputActive} errorMessage={this.state.errorMessage}>
        <TextInput
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholderTextColor={placeholderAndSelectionColors}
          selectionColor={placeholderAndSelectionColors}
          {...this.getTypeProps()}
          {...this.props}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          onChangeText={text => this.onChangeText(text)}
          style={fieldTextStyle}
          cursor={{ start: this.state.text.length, end: this.state.text.length }}
          ref="input"
        />
      </InputContainer>
    );
  }
}

export default FormidableTextInput;
