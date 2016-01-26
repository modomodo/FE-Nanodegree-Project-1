var pngquant = require('imagemin-pngquant'),
jpegtran = require('imagemin-jpegtran');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    copy: {
      files: {
        expand: true,
        cwd: 'src/img/',
        src: '*.svg',
        dest: 'dist/img/',
        flatten: true
      }
    },

    responsive_images: {
      work: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1600,
            height: 585,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false,
            suffix: '@2x'
          }, {
            width: 800,
            height: 293,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false
          }]
        },
        files: [{
          expand: true,
          src: ['*.png'],
          cwd: 'src/img',
          dest: 'dist/img'
        }]
      },

      carousel: {
        options: {
          engine: 'im',
          sizes: [{
            height: 800,
            quality: 75,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false,
          }, {
            height: 1280,
            quality: 75,
            sharpen: {
              sigma: 1,
              radius: 2
            },
            rename: false,
            suffix: '@2x'
          }]
        },
        files: [{
          expand: true,
          src: ['*.jpg'],
          cwd: 'src/img',
          dest: 'dist/img'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      src: ['dist/img/']
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
