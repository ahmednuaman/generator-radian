define [
  'config'
  'angular'
], (cfg, A) ->
  class <%= _.classify(name) %>Controller
    @$inject = [
      '$scope'
    ]

    constructor: (@$scope) ->
      @init()

    init: () ->

  app = A.module cfg.ngApp
  app.controller '<%= _.camelize(name) %>Controller', <%= _.classify(name) %>Controller
