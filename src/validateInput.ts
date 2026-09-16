import { nonEmptyString, required, string } from './rules';
import type { BuiltInRuleName, FieldCheck, Rule } from './types';

const RULES: Record<BuiltInRuleName, Rule> = {
  required,
  nonEmptyString,
  string,
};

export const validateInput = (
  input: Record<string, unknown> | null | undefined,
  checks: FieldCheck[],
): void => {
  const normalized = input ?? {};

  for (const check of checks) {
    const fieldRules = check.rules ?? ['required', 'nonEmptyString'];
    const value = normalized[check.field];

    for (const ruleName of fieldRules) {
      const rule = RULES[ruleName];
      if (!rule) {
        throw new Error(`Unknown validation rule: ${ruleName}`);
      }

      if (rule(value) !== null) {
        throw new Error(check.errorMessage);
      }
    }
  }
};
