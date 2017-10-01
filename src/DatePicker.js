// @flow

import React, { PureComponent } from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, TimePickerAndroid, View } from 'react-native';
import { format, setDay, setHours, setMinutes, setMonth, setYear } from 'date-fns';
import { DisableInputKeyboard, KeyboardModal, TextInput } from '.';
import { type _Props as _InputProps } from './TextInput';

type _Props = _InputProps & {
  /**
   * Name for the input
   * When building the `formData`, this will be used as the key
   */
  name: string,
  /**
   * Format for the displayed date value
   */
  format: string,
  /**
   * Currently selected date / date to show by default
   */
  date: Date,
  /**
   * Minimum date.
   * Restricts the range of possible date/time values.
   */
  minimumDate?: ?Date,
  /**
   * Maximum date.
   * Restricts the range of possible date/time values.
   */
  maximumDate?: ?Date,
  /**
   * The date picker mode.
   */
  mode?: 'date' | 'time' | 'datetime',
  /**
   * - To set the date-picker mode to calendar/spinner/default
   *     - 'calendar': Show a date picker in calendar mode.
   *     - 'spinner': Show a date picker in spinner mode.
   *     - 'default': Show a default native date picker(spinner/calendar) based on android versions.
   *
   * @platform android
   */
  androidMode?: 'calendar' | 'spinner' | 'default',
  /**
   * Only for android when mode=time
   * If true, the picker uses the 24-hour format.
   * If false, the picker shows an AM/PM chooser.
   * If undefined, the default for the current locale is used.
   *
   * @platform android
   */
  is24Hour?: ?number,
  /**
   * By default, the date picker will use the device's timezone.
   * With this parameter, it is possible to force a certain timezone offset.
   * For instance, to show times in Pacific Standard Time, pass -7 * 60.
   *
   * @platform ios
   */
  timeZoneOffsetInMinutes?: number,
  /**
   * The interval at which minutes can be selected.
   *
   * @platform ios
   */
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30,
  onChangeText: (value: any) => void,
};

type _State = {
  date: Date,
  showValue: boolean,
};

export default class FormidableDatePicker extends PureComponent {
  static defaultProps = {
    format: 'D MMMM YYYY',
    date: new Date(),
    mode: 'date',
    androidMode: 'default',
  };

  props: _Props;
  state: _State;

  constructor(props: _Props) {
    super(props);
    this.state = {
      date: this.props.date,
      showValue: false,
    };
  }

  pickerModalComponent: KeyboardModal;
  input: TextInput;

  focus() {
    this.openPicker();
  }

  openTimepickerAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
        is24Hour: this.props.is24Hour,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.onChangeValue(setHours(setMinutes(this.state.date, minute), hour));
      }
    } catch (error) {
      console.warn('Cannot open time picker', error);
    }
  };

  openDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(this.state.date),
        maxDate: this.props.maximumDate,
        minDate: this.props.minimumDate,
        mode: this.props.androidMode,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.onChangeValue(setYear(setMonth(setDay(this.state.date, day), month), year));
      }
    } catch (error) {
      console.warn('Cannot open date picker', error);
    }
  };

  openPicker = async () => {
    if (this.pickerModalComponent) this.pickerModalComponent.open();
    if (Platform.OS === 'android') {
      switch (this.props.mode) {
        case 'datetime':
          await this.openDatePickerAndroid();
          await this.openTimepickerAndroid();
          break;
        case 'time':
          this.openTimepickerAndroid();
          break;
        case 'date':
        default:
          this.openDatePickerAndroid();
          break;
      }
    }
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
        {Platform.OS === 'ios' && (
          <KeyboardModal
            ref={(ref) => {
              this.pickerModalComponent = ref;
            }}
            {...this.props}
          >
            <DatePickerIOS
              onDateChange={this.onChangeValue}
              {...this.props}
              date={this.state.date}
            />
          </KeyboardModal>
        )}
      </View>
    );
  }
}
