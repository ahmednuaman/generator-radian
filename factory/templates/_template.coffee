define [
  'config'
  'angular'
], (cfg, A) ->
  <%= _.camelize(name) %>Factory = ($rootScope) ->
    privateMethod = () ->

    factory =
      publicMethod: () ->

  <%= _.camelize(name) %>Factory.$inject = [
    '$rootScope'
  ]

  app = A.module cfg.ngApp
  app.factory '<%= _.camelize(name) %>Factory', <%= _.camelize(name) %>Factory
