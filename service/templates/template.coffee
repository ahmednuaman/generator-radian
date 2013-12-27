define [
  'config'
  'angular'
], (cfg, A) ->
  class <%= _.classify(name); %>Service
    @$inject = [
      '$q'
      '$resource'
    ]

    constructor: (@$q, @$resource) ->
      @init()

    init: () ->
      @fooBar = @$resource '/foo/bar.json'

  app = A.module cfg.ngApp
  app.service '<%= _.camelize(name); %>Service', <%= _.classify(name); %>Service
