var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['angular', 'controller/radian-controller', 'directive/menu-component-directive', 'factory/menu-factory', 'factory/page-error-factory', 'service/menu-service'], function(A, RC) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('HeaderMenuController', ['$scope', 'menuFactory', 'menuService', 'pageErrorFactory']);

    _Class.prototype.init = function() {
      return this.loadMenu();
    };

    _Class.prototype.loadMenu = function() {
      var failure, success;
      success = A.bind(this, this.handleLoadMenuSuccess);
      failure = A.bind(this, this.handleLoadMenuFailure);
      return this.menuService.get().then(success, failure);
    };

    _Class.prototype.handleLoadMenuSuccess = function() {
      return this.$scope.menuItems = this.menuFactory.get();
    };

    _Class.prototype.handleLoadMenuFailure = function() {
      return this.pageErrorFactory.show500();
    };

    return _Class;

  })(RC);
});

/*
//# sourceMappingURL=../../../../assets/js/header-menu-controller.js.map
*/