var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controller/radian-controller'], function(RC) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('ErrorController', ['$scope', '$routeParams', 'pageTitleFactory']);

    _Class.prototype.init = function() {
      this.$scope.code = this.$routeParams.code || '404';
      return this.pageTitleFactory.setTitle("Error " + this.$scope.code);
    };

    return _Class;

  })(RC);
});

/*
//# sourceMappingURL=../../../assets/js/error-controller.js.map
*/