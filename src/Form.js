// @flow

import React, { PureComponent } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { isArray, isFunction, merge } from 'lodash';
import Toast from '@bam.tech/react-native-root-toast';
import Polyglot from 'node-polyglot';
import { KeyboardModal } from '.';
import defaultStyles from './defaultStyles';

type _FormData = { [inputKey: string]: any };

type _Props = {
  children: any,
  onSubmit: (formData: _FormData) => void,
  onChangeText: (formData: _FormData, isFormComplete: boolean) => void,
  formStyles: any,
  toastErrors: boolean,
  onValidationError: (errorMessages: _ValidationError[]) => void,
  getErrorMessage: (error: _Error, input: _ReactComponent) => string,
  usePackageValidation: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  errorMessages: { [errorType: _ErrorType]: string },
};

type _State = {
  formData: _FormData,
};

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
});

const errorMessages = {
  required: '%{displayName} : Ce champ est requis',
  invalid: '%{displayName} : Email invalide',
  digits: '%{displayName} : Ce champ ne doit comporter que des chiffres',
  minLength: '%{displayName} : Ce champ doit faire au moins %{minLength} caractères',
  length: '{%displayName%} : Ce champ doit faire {% length %} caractères',
};

const SUBMIT_TYPE = 'submit';

const isInput = component => component.props.type && component.props.type !== SUBMIT_TYPE;

class Form extends PureComponent {
  static defaultProps = {
    onSubmit: () => {},
    onChangeText: () => {},
    usePackageValidation: true,
  };

  props: _Props;
  state: _State;

  constructor(props: _Props) {
    super(props);

    this.setFormInputs(props);
    this.setInitialState();
    this.formStyles = merge({}, defaultStyles, props.formStyles);
    this.setPolyglot(props);
  }

  componentWillReceiveProps(nextProps: _Props) {
    this.setFormInputs(nextProps);
    this.setPolyglot(nextProps);
  }

  inputs: Array<Object>;
  inputRefs: { [name: string]: _ReactComponent };
  submitButton: Object;
  formStyles: Object;
  polyglot: any;

  setPolyglot(props: _Props) {
    this.polyglot = new Polyglot();
    this.polyglot.extend({
      ...errorMessages,
      ...props.errorMessages,
    });
  }

  setFormInputs(props: _Props) {
    this.inputRefs = {};
    this.inputs = isArray(props.children) ? props.children.filter(isInput) : [props.children];
  }

  setInitialState() {
    this.state = {
      formData: this.inputs.reduce(
        (formState, input) => ({
          ...formState,
          [input.props.name]: input.props.defaultValue,
        }),
        {},
      ),
    };
  }

  getErrorMessage = (error: _Error, input: any) => {
    if (this.props.getErrorMessage) return this.props.getErrorMessage(error, input);

    const { options } = error;

    return this.polyglot.t(error.type, {
      ...options,
      displayName: options.displayName || options.label || options.placeholder,
    });
  };

  onSubmit() {
    const validationErrors: _ValidationError[] = [];

    if (this.props.usePackageValidation) {
      this.inputs.forEach((child) => {
        if (!child.props.name) return;

        const childRef = this.inputRefs[child.props.name];
        const error = isFunction(childRef.getValidationError)
          ? childRef.getValidationError()
          : null;

        if (error) {
          validationErrors.push({
            input: child,
            name: child.props.name,
            placeholder: child.props.placeholder,
            message: this.getErrorMessage(error, child),
            error,
          });
        }
      });
    }

    if (validationErrors.length === 0) {
      Keyboard.dismiss();
      KeyboardModal.dismiss();
      this.props.onSubmit(this.state.formData);

      return;
    }

    if (this.props.toastErrors) {
      Toast.show(validationErrors[0].message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }

    if (this.props.onValidationError) {
      this.props.onValidationError(validationErrors);
    }
  }

  renderTextInputClone(input: any) {
    const inputPosition = this.inputs.findIndex(
      otherInput => input.props.name === otherInput.props.name,
    );
    const isLastInput = inputPosition === this.inputs.length - 1;

    return React.cloneElement(input, {
      ref: (ref) => {
        this.inputRefs[input.props.name] = ref;
      },
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
        const nextInputRef = this.inputRefs[nextInput.props.name];

        if (typeof nextInputRef.focus === 'function') nextInputRef.focus();
      },
      onChangeText: (value) => {
        this.setState(
          {
            formData: {
              ...this.state.formData,
              [input.props.name]: value,
            },
          },
          () => {
            const isFormComplete = Object.values(this.state.formData).reduce(
              (isActive, inputValue) => isActive && !!inputValue,
              true,
            );
            this.props.onChangeText(this.state.formData, isFormComplete);
          },
        );
      },
    });
  }

  renderChild = (child: _ReactComponent) => {
    if (child.props.type === SUBMIT_TYPE) {
      return React.cloneElement(child, {
        onPress: () => this.onSubmit(),
        key: 'submit',
      });
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
