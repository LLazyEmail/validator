import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { nonEmptyString, required, string } from './rules';
import { validateInput } from './validateInput';

describe('rules', () => {
  it('required fails on null and undefined', () => {
    assert.equal(required(null), 'is required');
    assert.equal(required(undefined), 'is required');
    assert.equal(required('ok'), null);
  });

  it('nonEmptyString fails only on empty string', () => {
    assert.equal(nonEmptyString(''), 'must not be empty');
    assert.equal(nonEmptyString('ok'), null);
    assert.equal(nonEmptyString(null), null);
  });

  it('string fails on non-string values that are present', () => {
    assert.equal(string(1), 'must be a string');
    assert.equal(string(null), null);
    assert.equal(string('ok'), null);
  });
});

describe('validateInput', () => {
  it('passes when required fields are present', () => {
    assert.doesNotThrow(() =>
      validateInput(
        { title: 'Newsletter' },
        [{ field: 'title', errorMessage: 'no title was passed' }],
      ),
    );
  });

  it('throws the mapped error when a required field is missing', () => {
    assert.throws(
      () =>
        validateInput(
          {},
          [{ field: 'title', errorMessage: 'no title was passed' }],
        ),
      /no title was passed/,
    );
  });

  it('throws on unknown rule names', () => {
    assert.throws(
      () =>
        validateInput(
          { title: 'x' },
          [{
            field: 'title',
            errorMessage: 'bad',
            rules: ['required', 'not-a-rule' as 'required'],
          }],
        ),
      /Unknown validation rule/,
    );
  });
});
