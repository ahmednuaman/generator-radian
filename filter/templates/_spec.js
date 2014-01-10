define([
  'config',
  'angular',
  'filter/<%= _.slugify(name) %>-filter'
], function(cfg, A) {
  describe('<%= _.humanize(name) %> filter', function() {
    var $location,
        filter;

    beforeEach(module(cfg.ngApp));
    beforeEach(inject(function($injector) {
      var $filter;

      $filter = $injector.get('$filter');
      $location = $injector.get('$location');
      filter = $filter('<%= _.camelize(name) %>Filter');
    }));

    it('should run the filter', function() {
      var filtered,
          input;

      input = 'foo';
      filtered = filter(input);

      expect(filtered).toBe("input " + input + ", $location.path() " + ($location.path()));
    });
  });
});
