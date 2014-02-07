module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Task jshint
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js', 'js/app.js'],
            options: {
                ignores: ['js/libs/*.js', 'js/build/*.js'],
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        // Task concat
        concat: {
            dist: {
                src: [
                    'js/libs/jquery-1.10.2.js', // Reihenfolge ist wichtig
                    'js/libs/handlebars-1.1.2.js',
                    'js/libs/ember-1.2.0.js',
                    'js/libs/bootstrap.min.js"',
                    'js/libs/bootstrap-datepicker.js"',
                    'js/libs/moment.min.js"',
                    'js/**/*.js',
                    'js/app.js'
                ],
                dest: 'js/build/production.js',
            }
        },
        // Task uglify
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'images/build/'
                    }
                ]
            }
        },
        watch: {
            options: {
                livereload: true // allows the reload of the browser when files changes occur
            },
            // subtask for watching js files
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint', 'concat', 'uglify'], // real grunt task
                options: {
                    spawn: false
                }
            },
            // subtaks for watching css/scss files
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'], // real grunt task
                options: {
                    spawn: false,
                }
            },
            emberTemplates: {
                files: ['templates/**/*.hbs'],
                tasks: ['emberTemplates', 'livereload']
            },
            dev: {
                files: ['templates/**/*.hbs', 'js/**/*.js', 'js/*.js', 'css/*.scss'],
                tasks: ['emberTemplates', 'neuter:app', 'sass']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    //'css/build/global.css': 'css/global.scss'
                    'css/style.css': 'css/style.scss'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    var templatePath = 'templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            dist: {
                files: {
                    '.tmp/scripts/compiled-templates.js': 'templates/{,*/}*.hbs'
                }
            }
        },
        neuter: { // build source files in order you require
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return 'js/' + filepath;
                    }
                },
                src: 'js/app.js',
                dest: '.tmp/scripts/combined-scripts.js'
            }
        },
        useminPrepare: {
            html: 'index.html'
        },
        usemin: {
            html: ['{,*/}*.html'],
            css: ['css/{,*/}*.css']
        },
    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-neuter');
    grunt.loadNpmTasks('grunt-usemin');
    
    

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
    grunt.registerTask('watchout', ['watch']);
    grunt.registerTask('watchdev', ['watch:dev']);

};
