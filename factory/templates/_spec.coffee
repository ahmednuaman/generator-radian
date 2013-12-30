define [
  'config'
  'angular'
  'factory/<%= _.slugify(name) %>-factory'
], (cfg, A) ->
  describe '<%= _.humanize(name) %> factory', () ->
    factory = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      factory = $injector.get '<%= _.camelize(name) %>Factory'

    it 'should load', () ->
      expect(factory.publicMethod).toBeDefined()