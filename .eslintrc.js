module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'nestjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:nestjs/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false, trailingComma: 'all' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'nestjs/no-raw-request-response': 'error',
  },
}
