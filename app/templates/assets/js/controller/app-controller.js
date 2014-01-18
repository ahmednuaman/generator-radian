var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['config', 'angular', 'controller/radian-controller', 'partials', 'routes', 'controller/header/header-controller', 'controller/footer-controller', 'factory/page-loader-factory', 'factory/page-title-factory'], function(cfg, A, RC) {
  var _ref;
  return (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.register('AppController', ['$scope', 'pageLoaderFactory', 'pageTitleFactory']);

    _Class.prototype.init = function() {
      this.addListeners();
      this.addPartials();
      return this.addScopeMethods();
    };

    _Class.prototype.addListeners = function() {
      this.pageLoaderFactory.addListener(A.bind(this, this.handlePageLoaderChange));
      return this.pageTitleFactory.addListener(A.bind(this, this.handlePageTitleChange));
    };

    _Class.prototype.addPartials = function() {
      this.$scope.ctaPartial = cfg.path.partial + 'cta-partial.html';
      this.$scope.footerPartial = cfg.path.partial + 'footer-partial.html';
      return this.$scope.headerPartial = cfg.path.partial + 'header/header-partial.html';
    };

    _Class.prototype.addScopeMethods = function() {
      return this.$scope.handleViewLoaded = A.bind(this, this.handleViewLoaded);
    };

    _Class.prototype.handlePageTitleChange = function(event, title) {
      return this.$scope.pageTitle = "Radian ~ A scalable AngularJS framework ~ " + title;
    };

    _Class.prototype.handlePageLoaderChange = function(event, show) {
      return this.$scope.hideLoader = !show;
    };

    _Class.prototype.handleViewLoaded = function() {
      return this.pageLoaderFactory.hide();
    };

    return _Class;

  })(RC);
});

/*
//# sourceMappingURL=../../../assets/js/app-controller.js.map
*/