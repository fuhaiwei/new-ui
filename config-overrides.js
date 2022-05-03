const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    ['#A']: path.resolve(__dirname, 'src/app'),
    ['#B']: path.resolve(__dirname, 'src/features'),
    ['#C']: path.resolve(__dirname, 'src/components'),
    ['#H']: path.resolve(__dirname, 'src/hooks'),
  })
)
