define([
  'config',
  'angular',
  'factory/<%= _.slugify(name) %>-factory'
], function(cfg, A) {
  describe('<%= _.humanize(name) %> factory', function() {
    var factory;

    beforeEach(module(cfg.ngApp));
    beforeEach(inject(function($injector) {
      factory = $injector.get('<%= _.camelize(name) %>Factory');
    }));

    it('should load', function() {
      expect(factory.publicMethod).toBeDefined();
    });
  });
});
