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
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@stylistic/js'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "@stylistic/js/indent": [
      "error",
      "tab"
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
    ]
  },
}
