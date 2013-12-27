define [
  'config'
  'angular'
], (cfg, A) ->
  <%= _.camelize(name); %>Directive = () ->
    templateUrl: cfg.path.partial + 'directive/<%= _.slugify(name); %>-partial.html'
    restrict: 'A'
    replace: true
    scope:
      items: '=ngModel'
    link: ($scope, $element, $attrs) ->


  app = A.module cfg.ngApp
  app.directive '<%= _.camelize(name); %>', <%= _.camelize(name); %>Directive
