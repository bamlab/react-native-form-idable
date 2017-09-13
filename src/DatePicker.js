import React, { PureComponent } from 'react';
import {
  DatePickerIOS,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput as RNInput,
  View,
} from 'react-native';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { DisableInputKeyboard, Form, KeyboardModal, TextInput } from '.';

type PropsType = {
  format: string,
};

export default class FormidableDatePicker extends PureComponent {
  props: PropsType;
  pickerModalComponent: any;

  static defaultProps = {
    format: 'D MMMM YYYY',
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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
    this.pickerModalComponent.open();
  };

  onChangeValue = value => {
    this.setState({ date: value, showValue: true });
    this.props.onChangeText(value);
  };

  render() {
    return (
      <View>
        <DisableInputKeyboard onPress={this.openPicker}>
          <TextInput
            ref="input"
            value={this.state.showValue ? format(this.state.date, this.props.format) : null}
            {...this.props}
          />
        </DisableInputKeyboard>
        <KeyboardModal ref={ref => (this.pickerModalComponent = ref)} {...this.props}>
          <DatePickerIOS date={this.state.date} onDateChange={this.onChangeValue} {...this.props} />
        </KeyboardModal>
      </View>
    );
  }
}
