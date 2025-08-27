// // .eslintrc.js
// module.exports = {
//   root: true,
//   extends: ['@react-native'],
// };
// // module.exports = {
// //   root: true,
// //   extends: '@react-native-community',
// //   parser: '@babel/eslint-parser',
// //   parserOptions: {
// //     requireConfigFile: false,
// //     babelOptions: {
// //       presets: ['module:metro-react-native-babel-preset'],
// //     },
// //     rules: {},
// //   },
// // };
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@react-native'],
  // v8 이상에서 동작. (아래 2번의 .eslintignore와 함께 사용해도 OK)
  ignorePatterns: [
    'node_modules/',
    'ios/',
    'android/',
    'build/',
    'dist/',
    'coverage/',
  ],

  rules: {
    // 빌드에는 영향 없지만 경고가 많은 룰들 ↓
    'react/no-unstable-nested-components': 'off',
    'react-native/no-inline-styles': 'off',
    'react/self-closing-comp': 'off',

    // 사용 안 하는 변수/인자는 경고로만 표시하고, _로 시작하면 허용
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // 훅 의존성은 경고로만 (원하면 'off')
    'react-hooks/exhaustive-deps': 'warn',
  },
};
