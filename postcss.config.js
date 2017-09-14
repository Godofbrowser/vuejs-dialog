// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    sourceMap: true,
    "plugins": {
        'postcss-import': require('postcss-import')(),
        'postcss-cssnext': require('postcss-cssnext')()
    }
}