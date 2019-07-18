'use strict'
/**
 * Created by Emmy on 10/7/2017.
 */

const baseConfig = require('./webpack.base.config')

baseConfig.module.rules = baseConfig.module.rules.map((rule) => {
    if (rule.test.toString() === '/\\.vue$/') {
        rule.options = rule.options || {}
        rule.options.optimizeSSR = false
    }

    return rule
})

module.exports = Object.assign({}, baseConfig, {
	target: 'node',
	devtool: 'inline-cheap-module-source-map'
})
