define [
  'config'
  'directive/radian-directive'
], (cfg, RD) ->
  RD '<%= _.camelize(name) %>', [
    '$rootScope'
  ], ($rootScope) ->
    templateUrl: cfg.path.partial + 'directive/stub-partial.html'
    restrict: 'A'
    replace: true
    scope:
      items: '=ngModel'
    link: ($scope, $element, $attrs) ->