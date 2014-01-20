module.exports = (grunt) ->
  grunt.config 'karma',
    unit:
      configFile: 'test/unit/karma.conf.<% if (precompilerCoffee) { %>coffee<% } else { %>js<% } %>'
      singleRun: true

  grunt.loadNpmTasks 'grunt-karma'