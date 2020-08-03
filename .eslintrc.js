module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'sonarjs',
    'promise',
    'immutable',
    'unicorn',
    'import',
    '@typescript-eslint',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  ignorePatterns: ['lib/**/*', 'node_modules/**/*'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'immutable/no-let': 'error',
    'immutable/no-mutation': 'off',

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-named-as-default': 'off',

    'prettier/prettier': 'warn',

    'unicorn/prevent-abbreviations': 'warn',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ],
    'unicorn/no-reduce': 'off',

    'id-length': 'warn',
    'no-console': 'warn',
    'no-underscore-dangle': 'off',
    'sort-imports': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off'
  }
};
