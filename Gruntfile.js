/**
 * @version
 *
 * 0.5.0 #11 Update packages for npm and bower
 * 0.4.1 #6 Tweaks
 * 0.4.0 #5 Add babel support for transpile
 * 0.2.0 #2 Create adapter for i18next
 * 0.1.0 #1 Initialize environment
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016-2019 Dallas Vogels <dvogels@islandlinux.org>
 *
 **/
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'his if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
// use t

module.exports = function (grunt)
{
    let dependencies = grunt.file.readJSON('./package.json').dependencies;

    let babel = require('rollup-plugin-babel');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths for the application
    let appConfig = {
        app: 'lib',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig(
        {

            // Project settings
            yeoman: appConfig,

            // Watches files for changes and runs tasks based on the changed files
            watch: {
                bower: {
                    files: ['bower.json']
                },
                js: {
                    files: ['lib/main/**/*.js'],
                    tasks: ['newer:jshint:all'],
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    }
                },
                jsTest: {
                    files: ['test/**/*.js'],
                    tasks: ['newer:jshint:test']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= yeoman.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                },
                i18n_wrapper: {
                    files: [
                        'lib/main/i18n-client/src/**/*.js',
                        'app/index.html',
                        'app/locales/**/*.json'
                    ],
                    tasks: [
                        'transpile'
                    ]
                }

            },

            // The actual grunt server settings
            connect: {
                options: {
                    port: 9001,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35728
                },
                livereload: {
                    options: {
                        open: true
//                    middleware: function (connect) {
//                        return [
//                            connect.static('.tmp'),
//                            connect().use(
//                                '/bower_components',
//                                connect.static('./bower_components')
//                            ),
//                            connect.static(appConfig.app)
//                        ];
//                    }
                    }
                },
                test: {
                    options: {
                        port: 9002,
                        middleware: function (connect)
                        {
                            return [
                                connect.static('.tmp'),
                                connect.static('test'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static(appConfig.app)
                            ];
                        }
                    }
                },
                dist: {
                    options: {
                        open: true,
                        base: '<%= yeoman.dist %>'
                    }
                }
            },

            // Make sure code styles are up to par and there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        'lib/main/**/*.js',
                        'app/**/*.js'
                    ]
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/spec/{,*/}*.js']
                }
            },

            // Empties folders to start fresh
            clean: {
                i18n_wrapper: 'lib/main/i18n-client/dist/*',
                server: '.tmp'
            },

            rollup: {
                options: {
                    plugins: [
                        babel(
                            {
                                presets: 'es2015-rollup',
                                exclude: './node_modules/**',
                                babelrc: false
                            }
                        )
                    ],
                    external: Object.keys(dependencies),
                    globals: {
                        i18next: 'i18next',
                        'i18next-xhr-backend': 'i18nextXHRBackend',
                        'sprintf-js': 'vsprintf'
                    }
                },
                dist_umd: {
                    options: {
                        format: 'umd',
                        moduleName: 'i18nClient'
                    },
                    files: {
                        'lib/main/i18n-client/dist/i18n-client-umd.js': ['lib/main/i18n-client/src/i18n-client.js']
                    }
                }
            }

        }
    );

    grunt.registerTask('transpile', ['clean', 'rollup']);

    grunt.registerTask(
        'serve', 'Compile then start a connect web server', function (target)
        {
            if (target === 'dist') {
                return grunt.task.run(['build', 'connect:dist:keepalive']);
            }

            grunt.task.run(
                [
                    'clean:server',
                    'transpile',
                    'connect:livereload',
                    'watch'
                ]
            );
        }
    );

    grunt.registerTask(
        'build', [
            'transpile'
        ]
    );

    grunt.registerTask(
        'default', [
            'newer:jshint',
            'test',
            'build'
        ]
    );
};

// EOF
