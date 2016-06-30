/**
 * Karma configuration
 *
 * Requires babel to for ES6:
 *
 * @see https://github.com/babel/karma-babel-preprocessor
 *
 * @version  x.x.x #9 Add testing framework
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
 */

module.exports = function (config) {

    'use strict';

    config.set(
        {
            preprocessors: {
                'lib/**/src/**/*.js': ['babel'],
                'test/spec/**/*.js': ['babel']
            },

            babelPreprocessor: {
                options: {
                    presets: ['es2015'],
                    sourceMap: 'inline'
                },
                filename: function (file) {
                    return file.originalPath.replace(/\.js$/, '.es5.js');
                },
                sourceFileName: function (file) {
                    return file.originalPath;
                }
            },

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // base path, that will be used to resolve files and exclude
            basePath: '../',

            // testing framework to use (jasmine/mocha/qunit/...)
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                'lib/**/src/**/*.js',
                'test/spec/**/*.js'
            ],

            // list of files / patterns to exclude
            exclude: [],

            // web server port
            port: 8080,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: [
                'Custom_Chrome'
            ],

            customLaunchers: {
                'Custom_Chrome': {
                    base: 'Chrome',
                    flags: ['--enable-javascript-harmony']
                }
            },

            // Which plugins to enable
            plugins: [
                'karma-chrome-launcher',
                'karma-phantomjs-launcher',
                'karma-jasmine',
                'karma-babel-preprocessor',
                'karma-commonjs'
            ],

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false,

            colors: true,

            // level of logging
            // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
            logLevel: config.LOG_INFO
        }
    );
};

// EOF
