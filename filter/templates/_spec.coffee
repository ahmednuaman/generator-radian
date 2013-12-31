define [
  'config'
  'angular'
  'filter/<%= _.slugify(name) %>-filter'
], (cfg, A) ->
  describe '<%= _.humanize(name) %> filter', () ->
    $location = null
    filter = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      $filter = $injector.get '$filter'
      $location = $injector.get '$location'
      filter = $filter '<%= _.camelize(name) %>Filter'

    it 'should run the filter', () ->
      input = 'foo'
      filtered = filter input

      expect(filtered).toBe "input #{input}, $location.path() #{$location.path()}"