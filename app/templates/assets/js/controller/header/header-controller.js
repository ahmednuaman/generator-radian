var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['config', 'controller/radian-controller', 'controller/header/header-menu-controller'], function(cfg, RC) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('HeaderController', ['$scope']);

    _Class.prototype.init = function() {
      return this.addPartials();
    };

    _Class.prototype.addPartials = function() {
      return this.$scope.menuPartial = cfg.path.partial + 'header/header-menu-partial.html';
    };

    return _Class;

  })(RC);
});

/*
//# sourceMappingURL=../../../../assets/js/header-controller.js.map
*/