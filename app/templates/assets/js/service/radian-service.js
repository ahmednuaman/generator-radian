define(['helper/radian-module-helper'], function(helper) {
  var RadianService;
  return RadianService = (function() {
    RadianService.register = function(name, deps) {
      return helper.registerService([name, deps, this]);
    };

    function RadianService() {
      helper.construct(this, arguments);
    }

    return RadianService;

  })();
});

/*
//# sourceMappingURL=../../../assets/js/radian-service.js.map
*/