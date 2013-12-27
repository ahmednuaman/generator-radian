define [
  'config'
  'angular'
], (cfg, A) ->
  class <%= _.classify(name) %>
    @$inject = [
      '$scope'
    ]

    constructor: (@$scope) ->
      @init()

    init: () ->

  app = A.module cfg.ngApp
  app.controller '<%= _.camelize(name) %>', <%= _.classify(name) %>
