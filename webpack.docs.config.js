const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

const extractSass = new ExtractTextPlugin({
    filename: "css/app.[name].css",
    disable: false
});


const COMMON = require('./webpack.base.config')

const DOCS = Object.assign({}, COMMON, {
    name: 'docs',
    entry: [
        './src/docs/js/app.js',
        './src/docs/scss/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: "js/app.[name].js",
    },
    devServer: {
        contentBase: path.join(__dirname, "docs"),
        compress: true,
        port: 9000
    },
    externals: {
        'vue': 'Vue'
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            hash: true,
            catch: true,
            filename: 'index.html',
            template: 'src/docs/index.html'
        })
    ]
})

if (isProduction) {
    DOCS.devtool = '#none'
    DOCS.plugins = (DOCS.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    ])
}

module.exports = DOCS