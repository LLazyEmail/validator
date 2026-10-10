import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { email, maxLength, minLength, nonEmptyString, required, string, url } from './rules';
import { validateInput } from './validateInput';
import { ValidationError } from './types';

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

  it('email validates basic email format', () => {
    assert.equal(email('user@example.com'), null);
    assert.equal(email('bad'), 'must be a valid email');
    assert.equal(email(null), null);
  });

  it('url validates basic http(s) URLs', () => {
    assert.equal(url('https://example.com'), null);
    assert.equal(url('not-a-url'), 'must be a valid URL');
    assert.equal(url(null), null);
  });

  it('minLength and maxLength work on strings', () => {
    const atLeast3 = minLength(3);
    const atMost5 = maxLength(5);
    assert.equal(atLeast3('ab'), 'must be at least 3 characters');
    assert.equal(atLeast3('abc'), null);
    assert.equal(atMost5('abcdef'), 'must be at most 5 characters');
    assert.equal(atMost5('abc'), null);
    assert.equal(atLeast3(123), null);
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

  it('throws ValidationError with the mapped error when a required field is missing', () => {
    assert.throws(
      () =>
        validateInput(
          {},
          [{ field: 'title', errorMessage: 'no title was passed' }],
        ),
      (err) => {
        assert.ok(err instanceof ValidationError);
        assert.equal(err.message, 'no title was passed');
        assert.equal(err.field, 'title');
        assert.equal(err.ruleMessage, 'is required');
        return true;
      },
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

  it('supports custom rule functions', () => {
    const isEven: (v: unknown) => string | null = (v) =>
      typeof v === 'number' && v % 2 === 0 ? null : 'must be even';

    assert.doesNotThrow(() =>
      validateInput(
        { count: 4 },
        [{ field: 'count', errorMessage: 'bad count', rules: [isEven] }],
      ),
    );

    assert.throws(
      () =>
        validateInput(
          { count: 3 },
          [{ field: 'count', errorMessage: 'bad count', rules: [isEven] }],
        ),
      (err) => err instanceof ValidationError && err.message === 'bad count',
    );
  });

  it('supports new built-in rules', () => {
    assert.doesNotThrow(() =>
      validateInput(
        { to: 'user@example.com' },
        [{ field: 'to', errorMessage: 'bad email', rules: ['required', 'email'] }],
      ),
    );

    assert.throws(
      () =>
        validateInput(
          { to: 'not-an-email' },
          [{ field: 'to', errorMessage: 'bad email', rules: ['email'] }],
        ),
      /bad email/,
    );
  });
});
