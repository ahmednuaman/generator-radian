define([
  'lodash'
  'helper/radian-module-helper'
], function(_, helper) {
  return function(name, deps, funcs) {
    klass = function() {};

    _.assign(klass.prototype, funcs);

    helper.registerController([name, deps, klass]);
    helper.construct(klass, deps);
  }
});