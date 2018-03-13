const path = require('path')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin');

const isProduction = process.env.NODE_ENV === 'production'

const COMMON = require('./webpack.base.config')

const DIST = Object.assign({}, COMMON, {
    name: 'dist',
    entry: './src/plugin/js',
    output: {
        library: 'VuejsDialog',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vuejs-dialog.min.js'
    }
})

if (isProduction) {
    DIST.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    DIST.plugins = (DIST.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports = DIST