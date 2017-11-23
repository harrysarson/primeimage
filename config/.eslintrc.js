module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
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
  },
};
