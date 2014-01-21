module.exports = (grunt) ->
  <% if (precompilerCoffee) { %>cs = require 'coffee-script'

  <% } %>grunt.config 'ngtemplates',
    prod:
      src: 'assets/partial/**/*.html'
      dest: 'assets/js/partials.js'
      options:
        bootstrap: (module, script) ->
          # To save ourselves duplicating code, we take the [`assets/js/partials.coffee`](partials.html) file,
          # compile it to JS and then inject the compiled templates in; this then forms our `$templateCache` bootstrap.
          src = grunt.config 'ngtemplates.prod.dest'
          file = grunt.file.read src.replace /js/g, 'coffee'
          <% if (precompilerCoffee) { %>template = cs.compile file
          template<% } else { %>file<% } %>.replace 'return \'#{script}\'', script
        htmlmin:
          collapseBooleanAttributes: true
          collapseWhitespace: true
          removeComments: true
          removeEmptyAttributes: true
        prefix: '/'

  grunt.loadNpmTasks 'grunt-angular-templates'