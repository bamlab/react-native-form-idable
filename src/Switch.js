// @flow

import React, { PureComponent } from 'react';
import { Switch } from 'react-native';
import FormValidator from './FormValidator';
import InputContainer from './InputContainer';

type _Props = {
  name: string,
  onChangeText: (value: string) => void,
  getErrorMessage: (error: _Error) => string,
  defaultValue: string,
  required: boolean,
  placeholder: string,
  formStyles: any,
};

type _State = {
  text: ?string,
  errorMessage: ?string,
  isFocused: boolean,
  isActive: boolean,
};

class FormidableSwitch extends PureComponent {
  static defaultProps = {
    showError: false,
    customErrorMessage: '',
    onFocus: () => {},
    onBlur: () => {},
    onChangeText: () => {},
    getErrorMessage: () => {},
    defaultValue: false,
  };

  props: _Props;
  state: _State;

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

  render() {
    const { formStyles } = this.props;

    const fieldTextStyle = [formStyles.fieldText];

    return (
      <InputContainer errorMessage={this.state.errorMessage} {...this.props}>
        <Switch
          value={this.state.text}
          style={fieldTextStyle}
          {...this.props}
          onValueChange={text => this.onChangeText(text)}
        />
      </InputContainer>
    );
  }
}

export default FormidableSwitch;
