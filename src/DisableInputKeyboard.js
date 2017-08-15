import React, { PureComponent } from 'react';
import {
  Picker,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput as RNInput,
  View,
} from 'react-native';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import RootSiblings from 'react-native-root-siblings';
import { Form, KeyboardModal, TextInput } from '.';

type PropsType = {
  onPress: () => void,
  children: any,
};

export default class DisableInputKeyboard extends PureComponent {
  props: PropsType;

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View pointerEvents={'box-only'}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}
