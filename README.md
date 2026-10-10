# @llazyemail/validator

Small TypeScript validation helpers extracted from
[`hn_email_template` outerTemplate component validation](https://github.com/LLazyEmail/hn_email_template/tree/main/sub-modules/outerTemplate/src/components/validation).

## Install

```bash
npm install @llazyemail/validator
```

Requires a `read:packages` token for GitHub Packages. See `.npmrc.example`.

## Usage

```ts
import { validateInput, ValidationError, minLength } from '@llazyemail/validator';

try {
  validateInput(
    { title: 'Newsletter', email: 'user@example.com' },
    [
      { field: 'title', errorMessage: 'no title was passed' },
      { field: 'email', errorMessage: 'invalid email', rules: ['required', 'email'] },
      { field: 'title', errorMessage: 'title too short', rules: [minLength(3)] },
    ],
  );
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(err.field, err.message, err.ruleMessage);
  }
}
```

Built-in rules: `required`, `nonEmptyString`, `string`, `email`, `url`.

Length helpers: `minLength(n)`, `maxLength(n)`.

A check defaults to `['required', 'nonEmptyString']` when `rules` is omitted.

Custom `Rule` functions are also accepted in the `rules` array.

## Develop

```bash
npm install
npm test
npm run typecheck
npm run build
```

`tsup` emits ESM + CJS + `.d.ts` into `dist/`.
