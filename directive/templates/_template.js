define([
  'config',
  'directive/radian-directive'
], function(cfg, RD) {
  RD('<%= _.camelize(name) %>', [
    '$rootScope'
  ], function($rootScope) {
    return {
      templateUrl: cfg.path.partial + 'directive/stub-partial.html',
      restrict: 'A',
      replace: true,
      scope: {
        items: '=ngModel'
      },
      link: function($scope, $element, $attrs) {

      }
    };
  });
});
