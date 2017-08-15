import React, { PureComponent } from 'react';
import { Picker, StyleSheet, TouchableOpacity, TextInput as RNInput, View } from 'react-native';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import RootSiblings from 'react-native-root-siblings';
import { DisableInputKeyboard, Form, KeyboardModal, TextInput } from '.';

type PropsType = {};

export default class FormidablePicker extends PureComponent {
  props: PropsType;

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      showValue: false,
    };
  }
  props: PropsType;

  getValidationError() {
    return this.refs.input.getValidationError();
  }

  focus() {
    this.openPicker();
  }

  openPicker = () => {
    this.refs.pickerModal.open();
  };

  onValueChange = value => {
    this.setState({ selectedValue: value, showValue: true });
    if (this.props.onChangeText) this.props.onChangeText(value);
  };

  render() {
    const { children, ...props } = this.props;
    const pickerItems = children;

    return (
      <View>
        <DisableInputKeyboard onPress={this.openPicker}>
          <TextInput
            ref="input"
            value={
              this.state.showValue
                ? pickerItems.find(item => item.props.value === this.state.selectedValue).props
                    .label
                : null
            }
            {...props}
          />
        </DisableInputKeyboard>
        <KeyboardModal ref="pickerModal" {...this.props}>
          <Picker onValueChange={this.onValueChange} selectedValue={this.state.selectedValue}>
            {pickerItems}
          </Picker>
        </KeyboardModal>
      </View>
    );
  }
}

FormidablePicker.Item = Picker.Item;
