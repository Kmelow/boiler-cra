// console.log('rm-props')
require('babel-core').transform('code', {
  plugins: [
    ['react-remove-properties', {properties: ['data-test']}],
  ],
});