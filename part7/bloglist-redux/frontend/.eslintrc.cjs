module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    "vitest-globals/env": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@stylistic/js', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    "eqeqeq": "error",
    "no-console": 0,
    "@stylistic/js/indent": [
      "error",
      2
    ],
    "@stylistic/js/linebreak-style": [
      "error",
      "unix"
    ],
    "@stylistic/js/quotes": [
      "error",
      "double"
    ],
    "@stylistic/js/semi": [
      "error",
      "always"
    ],
    "prettier/prettier": ["error"]
  },
}
