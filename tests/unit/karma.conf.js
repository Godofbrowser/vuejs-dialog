/**
 * Created by Emmy on 10/10/2017.
 */

//  This is a karma config file. For more details see
//  http://karma-runner.github.io/0.13/config/configuration-file.html
//  we are also using it with karma-webpack
//  https://github.com/webpack/karma-webpack

const webpackConfig = require('../../webpack.test.config')

module.exports = function (config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],
        frameworks: ['mocha'],
        // frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
        // reporters: ['spec', 'coverage'],
        files: ['specs/**/*.spec.js'],
        preprocessors: {
            // './index.js': ['webpack', 'sourcemap']
            './specs/**/*.spec.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
        // coverageReporter: {
        //     dir: './coverage',
        //     reporters: [
        //         {type: 'lcov', subdir: '.'},
        //         {type: 'text-summary'}
        //     ]
        // }
    })
}
