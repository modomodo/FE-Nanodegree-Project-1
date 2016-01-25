var pngquant = require('imagemin-pngquant'),
jpegtran = require('imagemin-jpegtran');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    copy: {
      main: {
        src: 'src/img/udacity_logo.svg',
        dest: 'dist/img/udacity_logo.svg'
      }
    },

    responsive_images: {
      responsive: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1280,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false,
            suffix: '@2x'
          }, {
            width: 768,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/img',
          dest: 'dist/img'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      src: ['dist/']
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 6,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant({
            quality: '75'
          }), jpegtran({
            progressive: true
          })]
        },
        files: [{
          expand: true,
          cwd: 'dist/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img/'
        }]
      }
    },

    jshint: {
      src: 'Gruntfile.js'
    }
  });

  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'responsive_images', 'imagemin']);
};
