module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  plugins: [
    'chai-friendly',
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: true,
      allowUnboundThis: true,
    }],
    'import/extensions': 'always',
    'import/prefer-default-export': 'never',
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
  },
  settings: {
    'import/resolver': [
      'url',
      'node',
    ],
  },
};
