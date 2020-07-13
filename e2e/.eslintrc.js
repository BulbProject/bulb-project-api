module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    'immutable/no-let': 'off',
    'immutable/no-mutation': 'off',

    'import/no-extraneous-dependencies': 'off',

    '@typescript-eslint/ban-types': 'off',
  },
};
