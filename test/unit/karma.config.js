/**
 * Created by Emmy on 10/10/2017.
 */

const webpackConfig = require('../../webpack.test.config')

module.exports = function (config) {
    config.set({
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],
        frameworks: ['mocha', 'phantomjs-shim'],
        reporters: ['spec', 'coverage'],
        files: [
            '../../src/plugin/js/index.js',
            'specs/**/*.spec.js'
        ],
        preprocessors: {
            '../../src/plugin/js/index.js': ['webpack', 'coverage'],
            './specs/**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        colors: true,
        coverageReporter: {
            dir: './coverage',
            subdir: function(browser) {
                // normalization process to keep a consistent browser name across different
                // OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            },
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary'}
            ],
            // exclude: [ "**/*.spec.js", "**/node_modules/**/*" ]
        }
    })
}
