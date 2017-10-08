'use strict'
/**
 * Created by Emmy on 10/7/2017.
 */

const baseConfig = require('./webpack.base.config')

module.exports = Object.assign({}, baseConfig, {
	target: 'node',
	devtool: 'inline-cheap-module-source-map'
})
