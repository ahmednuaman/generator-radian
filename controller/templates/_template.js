define([
  'controller/radian-controller'
], function(RC) {
  RC('<%= _.classify(name) %>Controller', [
    '$scope'
  ], {
    init: function() {

    }
  });
});