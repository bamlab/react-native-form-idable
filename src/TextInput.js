// @flow

import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import FormValidator from './FormValidator';
import InputContainer from './InputContainer';

type _TextInputType = 'name' | 'text' | 'email' | 'password' | 'digits';

export type _Props = {
  name: string,
  formStyles: Object,
  type?: _TextInputType,
  label?: string,
  renderInputField: Function,

  // Validation
  getErrorMessage: ?(error: _Error) => ?string,
  errorMessage?: ?string,
  showError?: boolean,

  // Validation attributes
  maxLength?: ?number,
  minLength?: ?number,
  required?: boolean,

  // RN Text Input props
  onChangeText: (value: any) => void,
  placeholder?: string,
  defaultValue?: string,
  editable?: boolean,
  onFocus?: () => void,
  onBlur?: () => void,
};

type _State = {
  text: string,
  errorMessage: ?string,
  isFocused: boolean,
  isActive: boolean,
  isValid: boolean,
};

class FormidableTextInput extends PureComponent {
  static defaultProps = {
    formStyles: {},
    showError: false,
    onFocus: () => {},
    onBlur: () => {},
    // eslint-disable-next-line no-unused-vars
    onChangeText: (value: any) => undefined,
    getErrorMessage: () => null,
    defaultValue: '',
    type: 'name',
    placeholder: '',
    editable: true,
    required: false,
    maxLength: null,
    minLength: null,
    label: '',
    errorMessage: null,
    renderInputField: props => <TextInput {...props} />,
  };

  props: _Props;
  state: _State;

  constructor(props: _Props) {
    super(props);
    this.state = {
      errorMessage: this.props.errorMessage,
      text: this.props.defaultValue || '',
      isFocused: false,
      isActive: false,
      isValid: false,
    };
  }

  componentWillReceiveProps(nextProps: _Props) {
    if (nextProps.errorMessage !== this.props.errorMessage) {
      this.setState({
        errorMessage: nextProps.errorMessage,
      });
    }
  }

  input: TextInput;

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
    if (this.props.onBlur) this.props.onBlur();
  }

  onFocus() {
    this.setState({ isFocused: true });
    if (this.props.onFocus) this.props.onFocus();
  }

  getValidationError() {
    const error = FormValidator.validate({
      ...this.props,
      text: this.state.text,
    });

    if (error) {
      this.setState({
        errorMessage: this.props.getErrorMessage ? this.props.getErrorMessage(error) : null,
        isValid: false,
      });
    } else {
      this.setState({ isValid: true });
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
          autoCapitalize: 'none',
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
    this.input.focus();
  }

  renderInputField() {
    const { formStyles } = this.props;
    const isInputActive = this.state.isFocused;
    const { isValid } = this.state;

    const fieldTextStyle = [
      formStyles.fieldText,
      isInputActive && formStyles.activefieldText,
      isValid && formStyles.validFieldText,
    ];
    const placeholderAndSelectionColors = isInputActive
      ? formStyles.activePlaceholderAndSelectionColors || formStyles.placeholderAndSelectionColors
      : formStyles.placeholderAndSelectionColors;

    return this.props.renderInputField({
      value: this.state.text,
      underlineColorAndroid: 'transparent',
      placeholderTextColor: placeholderAndSelectionColors,
      selectionColor: placeholderAndSelectionColors,
      ...this.getTypeProps(),
      ...this.props,
      onBlur: () => this.onBlur(),
      onFocus: () => this.onFocus(),
      onChangeText: text => this.onChangeText(text),
      style: fieldTextStyle,
      cursor: { start: this.state.text.length, end: this.state.text.length },
      ref: (ref) => {
        this.input = ref;
      },
      active: isInputActive,
      valid: isValid,
      errorMessage: this.state.errorMessage,
    });
  }

  render() {
    const isInputActive = this.state.isFocused;
    const { isValid } = this.state;

    return (
      <InputContainer
        {...this.props}
        active={isInputActive}
        valid={isValid}
        errorMessage={this.state.errorMessage}
      >
        {this.renderInputField()}
      </InputContainer>
    );
  }
}

export default FormidableTextInput;
