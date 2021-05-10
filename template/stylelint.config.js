// eslint-disable-next-line @typescript-eslint/no-var-requires
const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  extends: ['stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': null,
    'order/properties-order': [sortOrderSmacss({ emptyLineBefore: 'always' })]
  }
}
