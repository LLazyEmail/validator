export type RuleResult = string | null;

export type Rule = (value: unknown) => RuleResult;

export type BuiltInRuleName =
  | 'required'
  | 'nonEmptyString'
  | 'string'
  | 'email'
  | 'url';

export type FieldCheck = {
  field: string;
  errorMessage: string;
  /** Built-in rule names or custom Rule functions. Defaults to ['required', 'nonEmptyString']. */
  rules?: (BuiltInRuleName | Rule)[];
};

export class ValidationError extends Error {
  readonly field: string;
  readonly ruleMessage: string | null;

  constructor(message: string, field: string, ruleMessage: string | null = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.ruleMessage = ruleMessage;
  }
}
