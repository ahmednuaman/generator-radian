define [
  'filter/radian-filter'
], (RF) ->
  RF '<%= _.camelize(name) %>', [
    '$location'
  ], ($location) ->
    (input) ->
      "input #{input}, $location.path() #{$location.path()}"