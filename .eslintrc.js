module.exports = {
  // parseOptions: {
  //   sourceType: 'module',
  // },
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  extends: 'eslint:recommended',
  globals: {
    // Common globals.
    Cs: true,
    Wa: true,
    moment: true,
    jSmart: true,
    Modernizr: true,
    videojs: true,
    Highcharts: true,
    Ext: true,
    _: true, // Get text
    html2canvas: true,
    stackBlurCanvasRGB: true,
    FB: true,
    IN: true,
    CKEDITOR: true,
    Resumable: true,
    CryptoJS: true,

    // Project specific.
    Sc: true // <-- remember to update to your project global!
  },
  rules: {
    indent: ['off', 2, { ObjectExpression: 0 }],
    'brace-style': ['warn', 'allman', { allowSingleLine: true }],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    semi: ['warn', 'always'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'no-mixed-spaces-and-tabs': ['warn'],
    'linebreak-style': ['off'],
    'no-debugger': ['warn'],
    'keyword-spacing': [
      'warn',
      {
        after: true
      }
    ],
    'no-use-before-define': ['error', { functions: false }],
    'space-infix-ops': ['error'],
    'comma-dangle': ['warn', 'never']
  }
};
