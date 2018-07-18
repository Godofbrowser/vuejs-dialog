const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isProduction = process.env.NODE_ENV === 'production'

const CONFIG = {
	mode: isProduction ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
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
		new VueLoaderPlugin(),
		new WebpackNotifierPlugin({ alwaysNotify: true })
	],
	optimization: {
		minimize: isProduction
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
	devtool: isProduction ? '' : '#eval-source-map'
}

module.exports = CONFIG
