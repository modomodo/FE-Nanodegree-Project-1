var pngquant = require('imagemin-pngquant');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });

  grunt.initConfig({
    responsive_images: {
      dist: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1280,
            suffix: '@2x'
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'dist/img',
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
          optimizationLevel: 5,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant({
            quality: '75'
          })]
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img/'
        }]
      }
    },

    jshint: {
      src: 'Gruntfile.js'
    }
  });

  grunt.registerTask('default', ['jshint', 'clean', 'imagemin', 'responsive_images']);
};
