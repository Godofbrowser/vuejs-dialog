const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production'

const extractCss = new MiniCssExtractPlugin({
	filename: 'vuejs-dialog.min.css'
})

const COMMON = require('./webpack.base.config')

const CONFIG = Object.assign({}, COMMON, {
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
	CONFIG.plugins = (CONFIG.plugins || []).concat([
		extractCss
	])
}

module.exports = CONFIG
