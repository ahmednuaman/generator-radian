define [
  'config'
  'angular'
  'service/<%= _.slugify(name) %>-service'
], (cfg, A) ->
  describe '<%= _.humanize(name) %> service', () ->
    service = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      service = $injector.get '<%= _.camelize(name) %>Service'

    it 'should load', () ->
      expect(service.fooBar).toBeDefined()