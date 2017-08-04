import React, { Component } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { isArray, merge } from 'lodash';
import Toast from 'react-native-root-toast';
import Polyglot from 'node-polyglot';
import defaultStyles from './defaultStyles';

type _ValidationError = {
  input: any,
  message: string,
};

type _Props = {
  children: any,
  submitText: string,
  onSubmit: () => void,
  scrollable: boolean,
  toastErrors: boolean,
  isLoading: boolean,
  formStyles: any,
  onValidationError: () => _ValidationError[],
  isCompleteOnChangeValue: () => void,
  getErrorMessage: (error: _Error, input) => string,
  errorMessages: { [errorType: _ErrorType]: string },
};

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
});

type _ErrorType = 'required' | 'invalid' | 'digits' | 'length' | 'minLength';

type _Error = {
  type: _ErrorType,
  data: Object,
};

const errorMessages = {
  required: '%{placeholder} : Ce champ est requis',
  invalid: '%{placeholder} : Email invalide',
  digits: '%{placeholder} : Ce champ ne doit comporter que des chiffres',
  minLength: '%{placeholder} : Ce champ doit faire au moins %{minLength} caractères',
  length: '{%placeholder%} : Ce champ doit faire {% length %} caractères',
};

const SUBMIT_TYPE = 'submit';

const isInput = component => component.props.type && component.props.type !== SUBMIT_TYPE;

class Form extends Component {
  inputs: Array<Object>;
  state: Object;
  submitButton: Object;
  formStyles: Object;
  polyglot: any;

  static defaultProps = {
    submitText: 'validate',
    onSubmit: () => {},
    isCompleteOnChangeValue: () => {},
  };

  constructor(props: _Props) {
    super(props);

    this.setFormInputs(props);
    this.setInitialState();
    this.formStyles = merge({}, defaultStyles, props.formStyles);
    this.setPolyglot(props);
  }

  setPolyglot(props: _Props) {
    this.polyglot = new Polyglot();
    this.polyglot.extend({
      ...errorMessages,
      ...props.errorMessages,
    });
  }

  setFormInputs(props: _Props) {
    this.inputs = isArray(props.children) ? props.children.filter(isInput) : [props.children];
  }

  setInitialState() {
    this.state = this.inputs.reduce(
      (formState, input) => ({
        ...formState,
        [input.props.name]: input.props.defaultValue,
      }),
      {},
    );
  }

  componentWillReceiveProps(nextProps: _Props) {
    this.setFormInputs(nextProps);
    this.setPolyglot(nextProps);
  }

  getErrorMessage = (error: _Error, input: any) => {
    if (this.props.getErrorMessage) return this.props.getErrorMessage(error, input);

    return this.polyglot.t(error.type, error.options);
  };

  onSubmit() {
    const errorMessages: _ValidationError[] = [];

    this.inputs.forEach(child => {
      if (!child.props.name) return;
      const error = this.refs[child.props.name].getValidationError();

      if (error) {
        errorMessages.push({
          name: child.props.name,
          placeholder: child.props.placeholder,
          message: this.getErrorMessage(error, child),
          error,
        });
      }
    });

    if (errorMessages.length === 0) {
      Keyboard.dismiss();
      return this.props.onSubmit(this.state);
    }

    if (this.props.toastErrors) {
      Toast.show(errorMessages[0].message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }

    if (this.props.onValidationError) {
      this.props.onValidationError(errorMessages);
    }
  }

  renderTextInputClone(input: any) {
    const inputPosition = this.inputs.findIndex(
      otherInput => input.props.name === otherInput.props.name,
    );
    const isLastInput = inputPosition === this.inputs.length - 1;

    return React.cloneElement(input, {
      ref: input.props.name,
      key: input.props.name,
      getErrorMessage: this.getErrorMessage,
      formStyles: this.formStyles,
      returnKeyType: isLastInput ? 'done' : 'next',
      onSubmitEditing: () => {
        if (isLastInput) {
          this.onSubmit();
          return;
        }

        const nextInput = this.inputs[inputPosition + 1];
        this.refs[nextInput.props.name].focus();
      },
      onChangeValue: value => {
        this.setState({
          ...this.state,
          [input.props.name]: value,
        },
        () => {
          this.props.isCompleteOnChangeValue(
            Object.values(this.state).reduce(
              (isActive, inputValue) => isActive && !!inputValue,
              true
            )
          );
        });
      },
    });
  }

  renderChild = child => {
    if (child.props.type === SUBMIT_TYPE) {
      return React.cloneElement(child, { onPress: () => this.onSubmit(), key: 'submit' });
    }
    if (isInput(child)) return this.renderTextInputClone(child);

    return child;
  };

  render() {
    const children = isArray(this.props.children) ? this.props.children : [this.props.children];

    return (
      <View style={styles.scrollView}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="always">
          {children.map(this.renderChild)}
        </ScrollView>
      </View>
    );
  }
}

export default Form;
