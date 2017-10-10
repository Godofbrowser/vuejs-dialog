/**
 * Created by Emmy on 10/7/2017.
 */

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
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
				test: /\.css$/,
				loader: 'css-loader'
			},            {
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
				test: /\.html$/,
				loader: 'vue-html-loader'
			}
		]
	},
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                BABEL_ENV: JSON.stringify(process.env.BABEL_ENV)
            }
        })
    ]
}
