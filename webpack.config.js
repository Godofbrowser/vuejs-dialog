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

const EXAMPLE = Object.assign({}, COMMON, {
    name: 'example',
    entry: [
        './src/example/js/app.js',
        './src/example/scss/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, './example'),
        filename: "app.[name].js",
    },
    devServer: {
        contentBase: path.join(__dirname, "example"),
        compress: true,
        port: 9000
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            hash: true,
            catch: true,
            filename: 'index.html',
            template: 'src/example/index.html'
        })
    ]
})

const DIST = Object.assign({}, COMMON, {
    name: 'dist',
    entry: './src/plugin/index.js',
    output: {
        library: ['vuejs-dialog'],
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: isProduction ? 'vuejs-dialog.min.js' : 'vuejs-dialog.js'
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


    EXAMPLE.plugins = (EXAMPLE.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ])
}

module.exports = [EXAMPLE, DIST]