module.exports = {
  env: {
    es6: true,
    browser: true
  },
  extends: [
    "eslint:recommended",
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
  },
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }]
  },
  plugins: [
    "prettier", "react"
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
};
