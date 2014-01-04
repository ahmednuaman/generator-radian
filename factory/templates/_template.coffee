define [
  'factory/radian-factory'
], (RF) ->
  RF '<%= _.camelize(name) %>Factory', [
    '$rootScope'
  ], ($rootScope) ->
    privateMethod = () ->

    factory =
      publicMethod: () ->