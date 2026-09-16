import type { Rule } from './types';

export const required: Rule = (value) => {
  if (value === undefined || value === null) {
    return 'is required';
  }
  return null;
};

export const nonEmptyString: Rule = (value) => {
  if (value === '') {
    return 'must not be empty';
  }
  return null;
};

export const string: Rule = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'string') {
    return 'must be a string';
  }
  return null;
};
