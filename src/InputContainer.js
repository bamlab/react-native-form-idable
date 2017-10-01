// @flow

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

type _Props = {
  children: ?*,
  formStyles: Object,
  showError?: boolean,
  active?: boolean,
  valid?: ?boolean,
  editable?: boolean,
  errorMessage: ?string,
  label?: string,
};

class InputContainer extends PureComponent {
  static defaultProps = {
    children: null,
    formStyles: {},
    showError: false,
    active: false,
    valid: null,
    editable: false,
    label: '',
  };

  props: _Props;

  render() {
    const { formStyles, active, errorMessage, valid } = this.props;

    const containerStyle = [
      formStyles.fieldContainer,
      active && formStyles.activeFieldContainer,
      errorMessage ? formStyles.errorContainer : {},
      valid && formStyles.validFieldContainer,
    ];

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
            // TODO: Icon container
            // this.props.iconName ?
            //   <Icon name={this.props.iconName} size={iconSize} style={formStyles.icon} />
            //   : <View style={formStyles.iconPlaceholder} />
          }
          {this.props.children}
        </View>
        {this.props.showError &&
          this.props.errorMessage && (
            <View style={formStyles.errorTextContainer}>
              <Text style={formStyles.error}>{this.props.errorMessage}</Text>
            </View>
          )}
      </View>
    );
  }
}

export default InputContainer;
