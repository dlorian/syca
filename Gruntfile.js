module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

    // All configuration goes here
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        apidoc: {
            mypp: {
                src: "js/",        // source file directory
                dest: "apidoc/",   // destination directory
                options: {
                    debug: true,
                    includeFilters: [ ".*\\.js$" ],
                    excludeFilters: [ "node_modules/" ],
                    marked: {
                        gfm: true
                    }
                }
            }
        },
        // Task: jshint
        jshint: {
            files: ['Gruntfile.js', '**/*.js'],
            options: {
                undef: true,
                unused: true,
                ignores: ['public/*.js', 'node_modules/*.js'],
                globals: {
                    node: true,
                    console: true,
                },
                debug: true,
                funcscope: true,
                sub: true
            }
        },
        // Task: concurrent. Runs grunt tasks in cuncurrent way
        concurrent: {
            // TODO: Implement possible concurrent tasks
            // target1: ['coffee', 'sass'],
            // target2: ['jshint', 'mocha']
        },
        watch: {
            options: {
                livereload: true // allows the reload of the browser when files changes occur
            },
            // subtask for watching js files
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint', 'mochatest'], // real grunt task
                options: {
                    spawn: false
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    colors: true,
                    ignoreLeaks: false,
                    //quiet: true,
                    reporter: 'spec',
                    require: [
                        'coverage/blanket',
                        //function() { should = require('should'); },
                        function() { process.env.NODE_ENV = 'test'; }
                    ],
                },
                src: ['test/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'coverage.html'
                },
                src: ['test/**/*.js']
            }
        },
        shell: {                // Task
            runMongoDB: {       // Target
                options: {      // Options
                    stdout: false
                },
                command: 'mongod' // run standard mongo daemon
            }
        }
    });

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('test',  ['mochaTest']);

};
