define([
  'factory/radian-factory'
], function(RF) {
  RF('<%= _.camelize(name) %>Factory', [
    '$rootScope'
  ], function($rootScope) {
    var factory,
        privateMethod;

    privateMethod = function() {

    };

    return factory = {
      publicMethod: function() {

      }
    };
  });
});