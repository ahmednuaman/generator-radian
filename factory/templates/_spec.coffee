define [
  'config'
  'angular'
  'factory/<%= _.slugify(this.name) %>-factory'
], (cfg, A) ->
  describe '<%= _.humanize(this.name) %> factory', () ->
    factory = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      factory = $injector.get '<%= _.camelize(this.name) %>Factory'

    it 'should load', () ->
      expect(factory.publicMethod).toBeDefined()