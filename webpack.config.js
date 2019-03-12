const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production'
const DEFAULT_FILENAME = 'vuejs-dialog'
const MAIN_ENTRY_NAME = 'main'
const MIXIN_ENTRY_NAME = 'mixin'

const extractCss = new MiniCssExtractPlugin({
	filename: DEFAULT_FILENAME + '.min.css'
})

const COMMON = require('./webpack.base.config')
const CONFIG = Object.assign({}, COMMON, {
	name: 'dist',
	entry: {
		[MAIN_ENTRY_NAME]: './src/plugin/js',
		[MIXIN_ENTRY_NAME]: './src/plugin/js/mixins/dialog-mixin.js'
	},
	output: {
		library: ['VuejsDialog', '[name]'],
		libraryTarget: 'umd',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: function (file) {
			"use strict"
			const chunkName = file.chunk.name
			const fileName = chunkName === MAIN_ENTRY_NAME
				? DEFAULT_FILENAME
				: [DEFAULT_FILENAME, chunkName].join('-')
			return `${fileName}.min.js`
		}
	}
})

if (isProduction) {
	CONFIG.plugins = (CONFIG.plugins || []).concat([
		extractCss
	])
}

module.exports = CONFIG
