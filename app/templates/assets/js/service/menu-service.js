var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['config', 'angular', 'service/radian-service', 'factory/menu-factory'], function(cfg, A, RS) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('menuService', ['$q', '$resource', 'menuFactory']);

    _Class.prototype.init = function() {
      return this.menu = this.$resource(cfg.api.data);
    };

    _Class.prototype.get = function() {
      var dfd, failure, success;
      dfd = this.$q.defer();
      success = A.bind(this, this.handleSuccess, dfd);
      failure = A.bind(this, this.handleFailure, dfd);
      this.menu.get().$promise.then(success, failure);
      return dfd.promise;
    };

    _Class.prototype.handleSuccess = function(dfd, menu) {
      return this.menuFactory.set(dfd, menu.items);
    };

    _Class.prototype.handleFailure = function(dfd) {
      return dfd.reject();
    };

    return _Class;

  })(RS);
});

/*
//# sourceMappingURL=../../../assets/js/menu-service.js.map
*/