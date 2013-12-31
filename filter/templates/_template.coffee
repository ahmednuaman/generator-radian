define [
  'config'
  'angular'
], (cfg, A) ->
  <%= _.camelize(name) %>Filter = ($location) ->
    (input) ->
      "input #{input}, $location.path() #{$location.path()}"

  <%= _.camelize(name) %>Filter.$inject = [
    '$location'
  ]

  app = A.module cfg.ngApp
  app.filter '<%= _.camelize(name) %>Filter', <%= _.camelize(name) %>Filter