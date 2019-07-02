import React from 'react';
import { DatePickerAndroid, Platform, TimePickerAndroid } from 'react-native';
import MockDate from 'mockdate';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DatePicker from './DatePicker';
import DisableInputKeyboard from './DisableInputKeyboard';

MockDate.set('1/1/2000', 120);

jest.mock('react-native-root-toast', () => ({}));

describe('<DatePicker />', () => {
  xit('builds a datepicker on iOS', () => {
    const wrapper = shallow(
      <DatePicker
        name="birthdate"
        type="date"
        placeholder="Birthdate"
        androidMode="calendar"
        minimumDate={new Date(1992, 7, 17)}
        date={new Date(2017, 8, 1)}
        maximumDate={new Date(2017, 8, 10)}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  xit('builds a timepicker on iOS', () => {
    const wrapper = shallow(
      <DatePicker
        format={'HH:mm'}
        name="hour"
        type="date"
        placeholder="Hour"
        mode="time"
        androidMode="calendar"
        is24Hour
        minuteInterval={30}
        timeZoneOffsetInMinutes={-7 * 60}
        date={new Date(2017, 8, 1, 14, 54)}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  xit('builds a datepicker on Android', () => {
    Platform.OS = 'android';
    DatePickerAndroid.open = jest.fn();

    const wrapper = shallow(
      <DatePicker
        name="birthdate"
        type="date"
        placeholder="Birthdate"
        androidMode="calendar"
        minimumDate={new Date(1992, 7, 17)}
        date={new Date(2017, 8, 1)}
        maximumDate={new Date(2017, 8, 10)}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find(DisableInputKeyboard)
      .first()
      .simulate('press');
    expect(DatePickerAndroid.open).toHaveBeenCalledWith({
      date: new Date(2017, 8, 1),
      maxDate: new Date(2017, 8, 10),
      minDate: new Date(1992, 7, 17),
      mode: 'calendar',
    });
  });

  xit('builds a timepicker on Android', () => {
    Platform.OS = 'android';
    TimePickerAndroid.open = jest.fn();

    const wrapper = shallow(
      <DatePicker
        format={'HH:mm'}
        name="hour"
        type="date"
        placeholder="Hour"
        mode="time"
        androidMode="calendar"
        is24Hour
        minuteInterval={30}
        timeZoneOffsetInMinutes={-7 * 60}
        date={new Date(2017, 8, 1, 14, 54)}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find(DisableInputKeyboard)
      .first()
      .simulate('press');
    expect(TimePickerAndroid.open).toHaveBeenCalledWith({ hour: 14, is24Hour: true, minute: 54 });
  });

  xit('builds a datetimepicker on Android', async () => {
    Platform.OS = 'android';
    DatePickerAndroid.open = jest.fn();
    TimePickerAndroid.open = jest.fn();

    const wrapper = shallow(
      <DatePicker
        format={'D MMMM YYYY HH:mm'}
        name="datetime"
        type="datetime"
        placeholder="Datetime"
        mode="datetime"
        androidMode="calendar"
        date={new Date(2017, 12, 1, 18, 54)}
        minimumDate={new Date(2000, 1, 1)}
        maximumDate={new Date(2017, 8, 10)}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find(DisableInputKeyboard)
      .first()
      .simulate('press');
    await expect(DatePickerAndroid.open).toHaveBeenCalledWith({
      date: new Date(2017, 12, 1, 18, 54),
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2017, 8, 10),
      mode: 'calendar',
    });
  });
});
