import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import FormValidator from './FormValidator';

type _TextInputType = 'name' | 'text' | 'email' | 'password' | 'digits';

type _Props = {
  name: string,
  onChangeValue: (value: string) => void,
  getErrorMessage: (error: _ErrorType) => string,
  iconName: string,
  defaultValue: string,
  required: boolean,
  showError: boolean,
  type: _TextInputType,
  placeholder: string,
  label: string,
  disabled: boolean,
  refName: string,
  formStyles: any,
  onFocus: () => void,
  onBlur: () => void,
};

type _State = {
  text: ?string,
  errorMessage: ?string,
};

class FormidableTextInput extends Component {
  props: _Props;
  state: _State;

  static defaultProps = {
    showError: false,
    onFocus: () => {},
    onBlur: () => {},
    getErrorMessage: () => {},
    defaultValue: "",
  };

  constructor(props: _Props) {
    super(props);
    this.state = {
      errorMessage: null,
      text: this.props.defaultValue,
      isFocused: false,
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
    const isInputActive = !!(this.state.text || this.state.isFocused);

    const containerStyle = [
      formStyles.fieldContainer,
      isInputActive && formStyles.activeFieldContainer,
      this.state.errorMessage ? formStyles.errorContainer : {},
    ];
    const inputLabelStyle = [
      formStyles.inputLabel,
      isInputActive && formStyles.activeInputLabel,
    ];
    const fieldTextStyle = [
      formStyles.fieldText,
      isInputActive && formStyles.activefieldText,
    ];
    const placeholderAndSelectionColors = isInputActive
      ? formStyles.activeSelectionColor || formStyles.selectionColor
      : formStyles.selectionColor;

    return (
      <View>
        {!!this.props.label &&
          <View style={formStyles.inputLabelContainer}>
            <Text style={formStyles.inputLabel}>
              {this.props.label}
            </Text>
          </View>}
        <View style={containerStyle}>
          {
            // this.props.iconName ?
            //   <Icon name={this.props.iconName} size={iconSize} style={formStyles.icon} />
            //   : <View style={formStyles.iconPlaceholder} />
          }
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
            ref="input"
          />
        </View>
        {this.props.showError &&
          <View style={formStyles.errorTextContainer}>
            <Text style={formStyles.error}>
              {this.state.errorMessage}
            </Text>
          </View>}
      </View>
    );
  }
}

export default FormidableTextInput;
