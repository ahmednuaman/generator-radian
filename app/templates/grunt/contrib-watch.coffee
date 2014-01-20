module.exports = (grunt) ->
  grunt.config 'watch',
    <% if (precompilerCoffee) { %>coffee:
      files: [
        'assets/coffee/**/*.coffee'
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
        <% if (precompilerSass) { %>
        'compass:devSASS'<% } %><% if (precompilerScss) { %>
        'compass:devSCSS'
      <% } %>]
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
    <% } %><% if (precompilerJS) { %>js:
      files: [
        'assets/javascript/**/*.js'
      ]
      tasks: [
        'jshint'
        'jscs'
      ]
      options:
        livereload: true
        spawn: false
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
    <% } %><% if (precompilerJade) { %>changedJadeFiles = changedFiles['jade']
    <% } %><% if (precompilerJS) { %>changedJSFiles = changedFiles['js']<% } %>

    <% if (precompilerCoffee) { %>if changedCoffeeFiles
      grunt.config 'coffeelint.all', changedCoffeeFiles
      grunt.config 'coffee.dev.src', _.map changedCoffeeFiles, (file) ->
        file.replace 'assets/coffee/', ''
    <% } %><% if (precompilerJade) { %>
    if changedJadeFiles
      grunt.config 'jade.dev.files',
        './': changedJadeFiles
    <% } %><% if (precompilerJS) { %>if changedJSFiles
      grunt.config 'jshint.all', changedJSFiles
      grunt.config 'jscs.src', changedJSFiles
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
