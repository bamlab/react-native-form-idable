// @flow

import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DisableInputKeyboard, KeyboardModal, TextInput } from '.';

type _Props = {
  name: string,
  children: ?*,
  onChangeText: (value: any) => void,
};

type _State = {
  selectedValue: ?any,
  showValue: boolean,
};

export default class FormidablePicker extends PureComponent {
  static Item = Picker.Item;
  static defaultProps = {
    children: null,
  };

  props: _Props;
  state: _State;

  constructor(props: _Props) {
    super(props);
    this.state = {
      selectedValue: null,
      showValue: false,
    };
  }

  input: TextInput;
  pickerModal: ?KeyboardModal;

  getValidationError() {
    return this.input.getValidationError();
  }

  focus() {
    this.openPicker();
  }

  openPicker = () => {
    if (this.pickerModal) this.pickerModal.open();
  };

  onValueChange = (value: any) => {
    this.setState({ selectedValue: value, showValue: true });
    if (this.props.onChangeText) this.props.onChangeText(value);
  };

  getDisplayedValue() {
    if (!this.state.showValue) return null;

    const selectedItem = (this.props.children || []).find(
      item => item.props.value === this.state.selectedValue,
    );

    return selectedItem ? selectedItem.props.label : null;
  }

  renderPicker() {
    const pickerItems = this.props.children;

    const picker = (
      <Picker onValueChange={this.onValueChange} selectedValue={this.state.selectedValue}>
        {pickerItems}
      </Picker>
    );

    return Platform.OS === 'ios' ? (
      <KeyboardModal
        ref={(ref) => {
          this.pickerModal = ref;
        }}
        {...this.props}
      >
        {picker}
      </KeyboardModal>
    ) : (
      picker
    );
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <View>
        <DisableInputKeyboard onPress={this.openPicker}>
          <TextInput
            ref={(ref) => {
              this.input = ref;
            }}
            value={this.getDisplayedValue()}
            {...props}
          />
        </DisableInputKeyboard>
        {this.renderPicker()}
      </View>
    );
  }
}
