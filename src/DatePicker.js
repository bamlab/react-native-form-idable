// @flow

import React, { PureComponent } from 'react';
import { DatePickerIOS, View } from 'react-native';
import { format } from 'date-fns';
import { DisableInputKeyboard, KeyboardModal, TextInput } from '.';
import { type _Props as _InputProps } from './TextInput';

type _Props = _InputProps & {
  format: string,
  onChangeText: (value: any) => void,
  name: string,
};

type _State = {
  date: Date,
  showValue: boolean,
};

export default class FormidableDatePicker extends PureComponent {
  static defaultProps = {
    format: 'D MMMM YYYY',
  };

  props: _Props;
  state: _State;

  constructor(props: _Props) {
    super(props);
    this.state = {
      date: new Date(),
      showValue: false,
    };
  }

  pickerModalComponent: KeyboardModal;
  input: TextInput;

  focus() {
    this.openPicker();
  }

  openPicker = () => {
    this.pickerModalComponent.open();
  };

  onChangeValue = (value: Date) => {
    this.setState({ date: value, showValue: true });
    this.props.onChangeText(value);
  };

  render() {
    return (
      <View>
        <DisableInputKeyboard onPress={this.openPicker}>
          <TextInput
            ref={(ref) => {
              this.input = ref;
            }}
            value={this.state.showValue ? format(this.state.date, this.props.format) : null}
            {...this.props}
          />
        </DisableInputKeyboard>
        <KeyboardModal
          ref={(ref) => {
            this.pickerModalComponent = ref;
          }}
          {...this.props}
        >
          <DatePickerIOS date={this.state.date} onDateChange={this.onChangeValue} {...this.props} />
        </KeyboardModal>
      </View>
    );
  }
}
