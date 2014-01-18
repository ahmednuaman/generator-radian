var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['service/radian-service'], function(RS) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('stubService', ['$q', '$resource']);

    _Class.prototype.init = function() {
      return this.fooBar = this.$resource('/foo/bar.json');
    };

    return _Class;

  })(RS);
});

/*
//# sourceMappingURL=../../../assets/js/stub-service.js.map
*/