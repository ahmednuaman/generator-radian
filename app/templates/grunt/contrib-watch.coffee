module.exports = (grunt) ->
  grunt.config 'watch',
    <% if (precompilerCoffee) { %>coffee:
      files: [
        'assets/js/**/*.coffee'
      ]
      tasks: [
        'coffeelint'
        'coffee:dev'
      ]
      options:
        livereload: true
        spawn: false
    <% } %><% if (precompilerSass || precompilerScss) { %>compass:
      files: [<% if (precompilerSass) { %>
        '<%%= compass.dev.options.sassDir %>/**/*.sass'<% } %><% if (precompilerScss) { %>
        '<%%= compass.dev.options.sassDir %>/**/*.scss'
      <% } %>]
      tasks: [
        'compass:dev'
      ]
    <% } %>css:
      files: [
        'assets/css/*.css'
        'assets/img/*.{gif,png,svg}'
        'assets/img/**/*.jpg'
      ]
      options:
        livereload: true
    <% if (precompilerJade) { %>jade:
      files: [
        '*.jade'
        'assets/partial/**/*.jade'
      ]
      tasks: [
        'jade:dev'
      ]
      <% if (precompilerCoffee) { %>options: '<%%= watch.coffee.options %>'<% } else { %>options:
        livereload: true
        spawn: false
    <% } %>
    <% } %><% if (precompilerLess) { %>less:
      files: [
        '<%%= less.dev.options.paths[0] %>/**/*.less'
      ]
      tasks: [
        'less:dev'
      ]
    <% } %>sprite:
      files: [
        'assets/img/**/*.png'
      ]
      tasks: [
        'sprite'
      ]
    <% if (precompilerStylus) { %>stylus:
      files: [
        'assets/styl/**/*.styl'
      ]
      tasks: [
        'stylus:dev'
      ]<% } %>

  <% if (precompilerCoffee || precompilerJade) { %>changedFiles = {}
  onChange = grunt.util._.debounce () ->
    <% if (precompilerCoffee) { %>changedCoffeeFiles = changedFiles['coffee']
    <% } %><% if (precompilerJade) { %>changedJadeFiles = changedFiles['jade']<% } %>

    <% if (precompilerCoffee) { %>if changedCoffeeFiles
      grunt.config 'coffee.dev.src', changedCoffeeFiles
      grunt.config 'coffeelint.all', changedCoffeeFiles
    <% } %><% if (precompilerJade) { %>
    if changedJadeFiles
      grunt.config 'jade.dev.files',
        './': changedJadeFiles
    <% } %>
    changedFiles = {}
  , 200

  grunt.event.on 'watch', (action, file) ->
    ext = file.split('.').pop()

    if !changedFiles[ext]
      changedFiles[ext] = []

    changedFiles[ext].push file

    onChange()
  <% } %>
  grunt.loadNpmTasks 'grunt-contrib-watch'
