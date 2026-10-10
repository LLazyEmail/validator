import { email, maxLength, minLength, nonEmptyString, required, string, url } from './rules';
import type { BuiltInRuleName, FieldCheck, Rule } from './types';
import { ValidationError } from './types';

const BUILT_IN_RULES: Record<BuiltInRuleName, Rule> = {
  required,
  nonEmptyString,
  string,
  email,
  url,
};

function resolveRule(rule: BuiltInRuleName | Rule): Rule {
  if (typeof rule === 'function') {
    return rule;
  }
  const builtIn = BUILT_IN_RULES[rule];
  if (!builtIn) {
    throw new Error(`Unknown validation rule: ${String(rule)}`);
  }
  return builtIn;
}

/**
 * Validate an input object against a list of field checks.
 * Throws ValidationError on the first failure (using the check's errorMessage).
 *
 * @param input - Object to validate (null/undefined treated as {}).
 * @param checks - Field checks to run.
 */
export const validateInput = (
  input: Record<string, unknown> | null | undefined,
  checks: FieldCheck[],
): void => {
  const normalized = input ?? {};

  for (const check of checks) {
    const fieldRules = check.rules ?? ['required', 'nonEmptyString'];
    const value = normalized[check.field];

    for (const ruleSpec of fieldRules) {
      const rule = resolveRule(ruleSpec);
      const result = rule(value);
      if (result !== null) {
        throw new ValidationError(check.errorMessage, check.field, result);
      }
    }
  }
};

export { minLength, maxLength };
