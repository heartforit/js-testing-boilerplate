/*jslint white: true */
var x = function() {
    'use strict';
    var grunt = require('grunt');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    return {
        compile: {
            options: {
                waitSeconds: 0,
                baseUrl: '.',
                name: 'src/main.js',
                mainConfigFile: ['src/main.js'],
                out: './dist/main.js',
                optimize: 'uglify2',
                generateSourceMaps: false,
                preserveLicenseComments: false,
                inlineText: true,
                findNestedDependencies: true,
                paths: {
                    requireLib: 'lib/require'
                },
                include: ['requireLib'],
                exclude: [],
                done: function(done, output) {
                    var duplicates = require('rjs-build-analysis').duplicates(output);
                    if (duplicates.length > 0) {
                        grunt.log.subhead('Duplicates found in requirejs build:');
                        grunt.log.warn(duplicates);
                        done(new Error('r.js built duplicate modules, please check the excludes option.'));
                    }
                    done();
                }
            }
        }
    };
};
module.exports = x();
