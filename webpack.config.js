const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production'

const extractCss = new MiniCssExtractPlugin({
	filename: 'vuejs-dialog.min.css'
})

const COMMON = require('./webpack.base.config')

const CONFIG = Object.assign({}, COMMON, {
	name: 'dist',
	entry: {
		'vuejs-dialog': './src/plugin/js',
		'vuejs-dialog-mixin': './src/plugin/js/mixins/dialog-mixin.js'
	},
	output: {
		library: 'VuejsDialog',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].min.js'
	}
})

if (isProduction) {
	CONFIG.plugins = (CONFIG.plugins || []).concat([
		extractCss
	])
}

module.exports = CONFIG
