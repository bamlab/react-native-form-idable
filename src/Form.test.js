console.error = jest.fn();

import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Text, TouchableOpacity } from 'react-native';

import Form from './Form';
import TextInput from './TextInput';

const jsdom = require('jsdom').jsdom;

const setupContainerTesting = () => {
  global.document = jsdom('');
  global.window = document.defaultView;
};
setupContainerTesting();

describe('<Form />', () => {
  it('should do stuff', () => {
    const onSubmit = jest.fn();
    const form = mount(
      <Form
        onSubmit={onSubmit}
      >
        <TextInput
          name="email"
          type="email"
          defaultValue="alexandrem@bam.tech"
        />
        <TextInput
          name="password"
          type="password"
          defaultValue="Very secure password"
        />
        <TouchableOpacity type="submit">
          <Text>Submit</Text>
        </TouchableOpacity>
      </Form>,
    );

    form.instance().onSubmit();

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'alexandrem@bam.tech',
      password: 'Very secure password',
    });
  });
});
