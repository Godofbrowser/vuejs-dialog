const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const extractSass = new MiniCssExtractPlugin({
	filename: 'css/app.[name].css'
})

const COMMON = require('./webpack.base.config')

const CONFIG = Object.assign({}, COMMON, {
	name: 'docs',
	entry: [
		'./src/docs/js/app.js',
		'./src/docs/scss/app.scss'
	],
	output: {
		path: path.resolve(__dirname, './docs'),
		filename: 'js/app.[name].js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'docs'),
		compress: true,
		port: 9000
	},
	externals: {
		'vue': 'Vue'
	}
})

CONFIG.plugins = (CONFIG.plugins || []).concat([
	extractSass,
	new HtmlWebpackPlugin({
		hash: true,
		catch: true,
		filename: 'index.html',
		template: 'src/docs/index.html'
	})
])

module.exports = CONFIG
