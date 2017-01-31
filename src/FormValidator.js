// @flow

import validator from 'validator';

export type _FormValidationOptions = {
  text?: ?string,
  minLength?: number,
  maxLength?: number,
  type?: string,
  required?: boolean,
}

export default class FormValidator {
  static validate(options: _FormValidationOptions) {
    const { text, minLength, maxLength, type, required } = options;

    if (required && !text) {
      return 'Ce champ est requis';
    }
    if (!required && !text) {
      return null;
    }
    if ('email' === type && !validator.isEmail(text)) {
      return 'Email invalide';
    }
    if ('digits' === type && !validator.isNumeric(text)) {
      return 'Ce champ ne doit comporter que des chiffres';
    }
    if (minLength && (!text || text.length < minLength)) {
      return minLength === maxLength ?
        `Ce champ doit faire ${minLength} caractères`
        : `Ce champ doit faire au moins ${minLength} caractères`;
    }
  }
}
