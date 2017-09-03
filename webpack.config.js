const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

const extractSass = new ExtractTextPlugin({
    filename: "app.[name].css",
    disable: false
});


const COMMON = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {minimize: isProduction}
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

const DOCS = Object.assign({}, COMMON, {
    name: 'docs',
    entry: [
        './src/docs/js/app.js',
        './src/docs/scss/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: "app.[name].js",
    },
    devServer: {
        contentBase: path.join(__dirname, "docs"),
        compress: true,
        port: 9000
    },
    externals: {
        'vue': 'Vue',
        'vuejs-dialog': 'VuejsDialog'
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

const DIST = Object.assign({}, COMMON, {
    name: 'dist',
    entry: './src/plugin/',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
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

    DOCS.devtool = '#none'
    DOCS.plugins = (DOCS.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    ])
}

module.exports = [DOCS, DIST]