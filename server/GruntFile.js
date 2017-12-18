module.exports = function(grunt) {
            // Do Grunt related things
            
      // Project configuration.
      grunt.initConfig({

        jshint: {
            options: {
              reporter: require('jshint-stylish'),
              esversion: 6
            },
             all: ['Grunfile.js', 'config/*.js']
           },
       
        nodemon: {
            dev: { script: 'index.js' }
        },
      
        pkg: grunt.file.readJSON('package.json'),
    
        env : {
          dev : {
            NODE_ENV : 'development'
          },
          production: {
            NODE_ENV : 'production'
          }
         }
      });
      
      grunt.loadNpmTasks('grunt-contrib-nodemon');
      grunt.loadNpmTasks('grunt-env');
    
      grunt.registerTask('default',  [
          'env:dev',
          'nodemon' 
      ]);

       grunt.registerTask('production',  [
          'env:production',
          'nodemon'
       ]);
    

       
    };
    