/**
 * @version 0.1.0 #1 Initialize environment
 *
 * @author Dallas Vogels <dvogels@islandlinux.org>
 *
 * @copyright (c) 2016 Dallas Vogels <dvogels@islandlinux.org>
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
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
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
                    files: ['bower.json'],
                    tasks: ['wiredep']
                },
                js: {
                    files: ['lib/angularjs/**/*.js', 'lib/main/**/*.js'],
                    tasks: ['newer:jshint:all'],
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    }
                },
                jsTest: {
                    files: ['test/**/*.js'],
                    tasks: ['newer:jshint:test', 'karma']
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
                il_i18n: {
                    files: [
                        'lib/main/il-i18n/src/**/*.js',
                        'app/index.html'
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
                il_i18n: 'lib/main/il-i18n/dist/*',
                server: '.tmp'
            },

            // Test settings
            karma: {
                unit: {
                    configFile: 'test/karma.conf.js',
                    singleRun: true
                }
            },

            rollup: {
                dist_es6: {
                    options: {
                        format: 'es6'
                    },
                    files: {
                        'lib/main/il-i18n/dist/il-i18n-es6.js': ['lib/main/il-i18n/src/il-i18n.js']
                    }
                },
                dist_umd: {
                    options: {
                        format: 'umd',
                        moduleName: 'il_i18n'
                    },
                    files: {
                        'lib/main/il-i18n/dist/il-i18n-umd.js': ['lib/main/il-i18n/src/il-i18n.js']
                    }
                },
                dist_cjs: {
                    options: {
                        format: 'cjs'
                    },
                    files: {
                        'lib/main/il-i18n/dist/il-i18n-cjs.js': ['lib/main/il-i18n/src/il-i18n.js']
                    }
                },
                dist_amd: {
                    options: {
                        format: 'amd'
                    },
                    files: {
                        'lib/main/il-i18n/dist/il-i18n-amd.js': ['lib/main/il-i18n/src/il-i18n.js']
                    }
                },
                dist_iife: {
                    options: {
                        format: 'iife',
                        moduleName: 'il_i18n'
                    },
                    files: {
                        'lib/main/il-i18n/dist/il-i18n-iife.js': ['lib/main/il-i18n/src/il-i18n.js']
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
        'test', [
            'clean:server',
            'connect:test',
            'karma'
        ]
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
