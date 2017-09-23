// @flow

import React, { PureComponent } from 'react';
import { Picker, View } from 'react-native';
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
  pickerModal: KeyboardModal;

  getValidationError() {
    return this.input.getValidationError();
  }

  focus() {
    this.openPicker();
  }

  openPicker = () => {
    this.pickerModal.open();
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

  render() {
    const { children, ...props } = this.props;
    const pickerItems = children;

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
        <KeyboardModal
          ref={(ref) => {
            this.pickerModal = ref;
          }}
          {...this.props}
        >
          <Picker onValueChange={this.onValueChange} selectedValue={this.state.selectedValue}>
            {pickerItems}
          </Picker>
        </KeyboardModal>
      </View>
    );
  }
}
