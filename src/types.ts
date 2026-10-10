export type RuleResult = string | null;

export type Rule = (value: unknown) => RuleResult;

export type BuiltInRuleName = 'required' | 'nonEmptyString' | 'string';

export type FieldCheck = {
  field: string;
  errorMessage: string;
  rules?: BuiltInRuleName[];
};
