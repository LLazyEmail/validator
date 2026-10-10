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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const email: Rule = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  if (typeof value !== 'string' || !EMAIL_RE.test(value)) {
    return 'must be a valid email';
  }
  return null;
};

const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

export const url: Rule = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  if (typeof value !== 'string' || !URL_RE.test(value)) {
    return 'must be a valid URL';
  }
  return null;
};

/** Factory for a minimum length rule (strings only; other types pass). */
export const minLength = (min: number): Rule => (value) => {
  if (typeof value !== 'string') return null;
  if (value.length < min) {
    return `must be at least ${min} characters`;
  }
  return null;
};

/** Factory for a maximum length rule (strings only; other types pass). */
export const maxLength = (max: number): Rule => (value) => {
  if (typeof value !== 'string') return null;
  if (value.length > max) {
    return `must be at most ${max} characters`;
  }
  return null;
};
