# @llazyemail/validator

Small TypeScript validation helpers extracted from
[`hn_email_template` outerTemplate component validation](https://github.com/LLazyEmail/hn_email_template/tree/main/sub-modules/outerTemplate/src/components/validation).

## Install

```bash
npm install @llazyemail/validator
```

## Usage

```ts
import { validateInput } from '@llazyemail/validator';

validateInput(
  { title: 'Newsletter', headStyles: '<style></style>' },
  [
    { field: 'title', errorMessage: 'no title was passed' },
    { field: 'headStyles', errorMessage: 'no headStyles was passed' },
  ],
);
```

Built-in rules: `required`, `nonEmptyString`, `string`.

A check defaults to `['required', 'nonEmptyString']` when `rules` is omitted.

## Develop

```bash
npm install
npm test
npm run build
```

`tsup` emits ESM + CJS + `.d.ts` into `dist/`.
