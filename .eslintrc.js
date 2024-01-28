module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:prettier/recommended', // recommends if the single quote is not there
  ],
  parser: '@typescript-eslint/parser',
  root: true,

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       paths: ['src'],
  //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //     },
  //   },
  //   react: {
  //     version: 'detect',
  //   },
  // },

  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    quotes: ['warn', 'single'],
    'prefer-const': 'error',
    'react/no-children-prop': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
  },
  //this contains list of all plugin that provide the linting rules
  //@typescript-eslint integrates eslint with typescript specific linting rules
  plugins: ['react', '@typescript-eslint', 'import', 'react-hooks', 'prettier'],
};
// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//     commonjs: true,
//     es6: true
//   },
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     tsx: true,
//     ts: true,
//     jsx: true
//   },
//   settings: {
//     react: {
//       version: 'detect'
//     }
//   },
//   // extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:@typescript-eslint/recommended',

//     'plugin:import/warnings',
//     'plugin:import/typescript',
//     'plugin:jsx-a11y/recommended',
//     // 'plugin:eslint-comments/recommended',
//     // 'prettier/@typescript-eslint',
//     'prettier/@typescript-eslint',
//     // "plugin:prettier/recommended",
//     'prettier'
//   ],
//   rules: {
//     // 'no-unused-vars': 'warn',
//     'react-hooks/exhaustive-deps': 'error',
//     // '@typescript-eslint/no-explicit-any': 'off',
//     '@typescript-eslint/no-explicit-any': 'error', //!this is not working // check later
//     // 'no-unused-vars': 'warn',
//     '@typescript-eslint/no-unused-vars': ['warn'],
//     '@typescript-eslint/no-var-requires': 'off',
//     'react/prop-types': 'off',
//     'react/jsx-uses-react': 'off',
//     'react/react-in-jsx-scope': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off'
//   },
//   plugins: ['react', '@typescript-eslint', 'import', 'react-hooks', 'prettier']
// };
