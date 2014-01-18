define([
  'config',
  'angular',
  'service/<%= _.slugify(name) %>-service'
], function(cfg, A) {
  describe('<%= _.humanize(name) %> service', function() {
    var service;

    beforeEach(module(cfg.ngApp));
    beforeEach(inject(function($injector) {
      service = $injector.get('<%= _.camelize(name) %>Service');
    }));

    it('should load', function() {
      expect(service.fooBar).toBeDefined();
    });
  });
});