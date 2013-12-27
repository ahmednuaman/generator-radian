define [
  'config'
  'angular'
  'service/<%= _.slugify(this.name) %>-service'
], (cfg, A) ->
  describe '<%= _.humanize(this.name) %> service', () ->
    service = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      service = $injector.get '<%= _.camelize(this.name) %>Service'

    it 'should load', () ->
      expect(service.fooBar).toBeDefined()