const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');

const isProduction = process.env.NODE_ENV === 'production'

const COMMON = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': 'vue-style-loader!css-loader!postcss-loader?sourceMap!sass-loader',
                            'sass': 'vue-style-loader!css-loader!postcss-loader?sourceMap!sass-loader?indentedSyntax',
                            'css': 'vue-style-loader!css-loader!postcss-loader?sourceMap'
                        },
                        // other vue-loader options go here
                        postcss: [require('postcss-cssnext')()]
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {minimize: isProduction}
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require('autoprefixer')()
                            ]
                        }
                    }, {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
                BABEL_ENV: JSON.stringify(process.env.BABEL_ENV || '')
            }
        }),
        new WebpackNotifierPlugin({alwaysNotify: true})
    ],
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

module.exports = COMMON
