// @flow

import validator from 'validator';

export default class FormValidator {
  static validate(options: _FormValidationOptions): ?_Error {
    const { text, minLength, maxLength, type, required } = options;

    if (required && !text) {
      return {
        type: 'required',
        options,
      };
    }
    if (!required && !text) {
      return null;
    }
    if (type === 'email' && !validator.isEmail(text)) {
      return {
        type: 'invalid',
        options,
      };
    }
    if (type === 'digits' && !validator.isNumeric(text)) {
      return {
        type: 'numeric',
        options,
      };
    }
    if (minLength && (!text || text.length < minLength)) {
      return minLength === maxLength
        ? {
          type: 'length',
          options: {
            ...options,
            length: maxLength,
          },
        }
        : {
          type: 'minLength',
          options,
        };
    }

    return null;
  }
}
