module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-curly-spacing': [2, { when: 'never' }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-tag-spacing': [2, { beforeClosing: 'never', beforeSelfClosing: 'always' }],
    'react/prop-types': [0],
    'switch-colon-spacing': [2, { after: true, before: false }]
  }
}
