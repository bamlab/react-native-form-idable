// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';

type _Props = {
  children: ?*,
  onPress: () => void,
  children: any,
};

export default class DisableInputKeyboard extends PureComponent {
  static defaultProps = {
    children: null,
  };

  props: _Props;

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View pointerEvents={'box-only'}>{this.props.children}</View>
      </TouchableOpacity>
    );
  }
}