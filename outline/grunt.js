// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {

  grunt.initConfig({

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    lint: {
      files: [
        "build/config.js", "app/**/*.js"
      ]
    },

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true
      }
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the underscore.js template function from 1.2.4.  You can
    // change the namespace and the template options, by reading this:
    // https://github.com/gruntjs/grunt-contrib/blob/master/docs/jst.md
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    jst: {
      "dist/debug/templates.js": [
        "app/templates/**/*.html"
      ]
    },

    // The handlebars task compiles all application templates into JavaScript
    // functions using Handlebars templating engine.
    //
    // Since this task defaults to writing to the same file as the jst task,
    // edit the debug task replacing jst with handlebars.
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    handlebars: {
      "dist/debug/templates.js": ["app/templates/**/*.html"]
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat: {
      dist: {
        src: [
          "assets/js/libs/almond.js",
          "dist/debug/templates.js",
          "dist/debug/require.js"
        ],

        dest: "dist/debug/require.js",

        separator: ";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      "dist/release/index.css": [
        "dist/debug/index.css"
      ]
    },

    // The stylus task is used to compile Stylus stylesheets into a single
    // CSS file for debug and release deployments.  
    stylus: {
      // Put all your CSS files here, order matters!
      files: [
        "assets/vendor/h5bp/css/style.css"
      ],

      // Default task which runs in debug mode, this will build out to the
      // `dist/debug` directory.
      compile: {
        // Used for @imports.
        options: { paths: ["assets/css"] },
        
        files: {
          "dist/debug/index.css": "<config:stylus.files>"
        }
      },

      // This dev task only runs with `watch:stylus` this will *completely*
      // overwrite the `assets/css/index.css` file referenced in `index.html`.
      // Use this only when you cannot use the `bbb server` runtime
      // compilation.
      dev: {
        // Used for @imports.
        options: { paths: ["css"] },
        
        files: {
          "assets/css/index.css": "<config:stylus.files>"
        }
      }
    },
    
    // Compass task to compile SASS/SCSS
    compass: {
        dev: {
            src: 'src/scss',
            dest: 'dist/css',
            
            linecomments: true,
            forcecompile: true,
            // require: 'animate-sass',
            debugsass: true,
            // images: '/path/to/images',
            relativeassets: true
        },
        // prod: {
        //     src: 'assets/scss',
        //     dest: 'assets/prod/css',
        //     outputstyle: 'compressed',
        //     linecomments: false,
        //     forcecompile: true,
        //     require: 'animate-sass mylib',
        //     debugsass: false,
        //     images: '/path/to/images',
        //     relativeassets: true
        // }
    },

    // The Haml compile task. This should take care of the index and any templates necessary.
    haml: {
      index: {
        src: "src/index.html.haml",
        dest: "dist/index.html"
      }
    },
    
    // The Coffee compile task
    coffee: {
      app: {
        src: "src/coffee/**/*.coffee",
        dest: "dist/js/",
        options: {
          bare: true, 
          preserve_dirs: true, 
          base_path: 'src/coffee'
        }
      }
    },
    
    // The file copy task. This should take care of keeping assets (aside from SCSS stylesheets) 
    // consistent between src and dist
    copy: {
      images: {
        src: "src/images/**",
        dest: "dist/images/"
      },
      assets: {
        src:  "src/assets/**",
        dest: "dist/assets/"
      }
    },

    // The watch task can be used to monitor the filesystem and execute
    // specific tasks when files are modified.  By default, the watch task is
    // available to compile stylus templates if you are unable to use the
    // runtime builder (use if you have a custom server, PhoneGap, Adobe Air,
    // etc.)
    watch: {
      coffee: {
        files: "src/coffee/**/*.coffee",
        tasks: "coffee"
      },
      scss: {
        files: "src/scss/**/*.scss",
        tasks: "compass"
      }, 
      copy_images: {
        files: "src/images/**",
        tasks: "copy:images"
      },
      copy_assets: {
        files: "src/assets/**",
        tasks: "copy:assets"
      }
    }
  });

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  grunt.registerTask("debug", "clean lint jst requirejs concat stylus:compile");

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "debug min mincss");
  grunt.registerTask("default", "coffee haml compass");
  
  // Include some additional tasks
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
