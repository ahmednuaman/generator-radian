define([
  'lodash'
  'helper/radian-module-helper'
], function(_, helper) {
  RadianController.register = function(name, deps) {
    return helper.registerController([name, deps, this]);
  };

  function RadianController() {
    helper.construct(this, arguments);
  }

  return RadianController;
});