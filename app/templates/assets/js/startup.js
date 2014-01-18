define(['config', 'angular'], function(cfg, A) {
  return require(['angular-animate', 'angular-resource', 'angular-route'], function() {
    A.module(cfg.ngApp, ['ngAnimate', 'ngResource', 'ngRoute']);
    return require(['controller/app-controller'], function() {
      return A.bootstrap(document.documentElement, [cfg.ngApp]);
    });
  });
});

/*
//# sourceMappingURL=../../assets/js/startup.js.map
*/