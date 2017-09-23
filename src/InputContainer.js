// @flow

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

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

class InputContainer extends PureComponent {
  props: _Props;
  state: _State;

  static defaultProps = {
    showError: false,
    customErrorMessage: '',
    active: false,
  };

  render() {
    const { formStyles, active, errorMessage } = this.props;

    const containerStyle = [
      formStyles.fieldContainer,
      active && formStyles.activeFieldContainer,
      errorMessage ? formStyles.errorContainer : {},
    ];
    const inputLabelStyle = [formStyles.inputLabel, active && formStyles.activeInputLabel];

    return (
      <View
        style={[
          formStyles.inputContainerStyle,
          this.props.editable === false && formStyles.nonEditableInput,
        ]}
      >
        <View style={containerStyle}>
          {!!this.props.label && (
            <View style={formStyles.inputLabelContainer}>
              <Text style={formStyles.inputLabel}>{this.props.label}</Text>
            </View>
          )}
          {
            // this.props.iconName ?
            //   <Icon name={this.props.iconName} size={iconSize} style={formStyles.icon} />
            //   : <View style={formStyles.iconPlaceholder} />
          }
          {this.props.children}
        </View>
        {(this.props.customErrorMessage || (this.props.showError && this.props.errorMessage)) && (
          <View style={formStyles.errorTextContainer}>
            <Text style={formStyles.error}>
              {this.props.customErrorMessage || this.props.errorMessage}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default InputContainer;
