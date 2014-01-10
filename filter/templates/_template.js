define([
  'filter/radian-filter'
], function(RF) {
  RF('<%= _.camelize(name) %>', [
    '$location'
  ], function($location) {
    function(input) {
      return "input " + input + ", $location.path() " + ($location.path());
    };
  });
});
