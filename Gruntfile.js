module.exports = function(grunt) {
  
  var config = {

    // Concat ================================
    concat: {
      options: {
        separator: ";"
      },
      tmp: {
        src: [
            "uglify/lib/*.js"
          , "uglify/nbm.js"
          , "uglify/modules/*.js"
          , "uglify/application.js"
        ],
        dest: "public/application.js"
      }
    },

    // Minification ================================
    uglify: {
      minify: {
        files: {
          "public/application.js": ["public/application.js"]
        }
      }
    },

    // Stylus ================================
    stylus: {
      main: {
        options: { compress: true },
        files: { 'public/application.css': 'stylus/application.styl' }
      }
    }

  };

  grunt.initConfig(config);
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask("default",["concat","uglify","stylus"]);
};