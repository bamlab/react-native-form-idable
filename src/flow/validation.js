// @flow
/* eslint-disable no-undef */

declare type _ErrorType = 'required' | 'invalid' | 'digits' | 'length' | 'minLength' | 'numeric';

declare type _FormValidationOptions = {
  text?: ?string,
  minLength?: ?number,
  maxLength?: ?number,
  type?: string,
  required?: boolean,
  placeholder: string,
};

declare type _Error = {
  type: _ErrorType,
  options: _FormValidationOptions,
};

declare type _ValidationError = {
  error: _Error,
  name: string,
  placeholder: string,
  input: _ReactComponent,
  message: string,
};
