define [
  'config'
  'angular'
  'controller/<%= _.slugify(this.name) %>-controller'
], (cfg, A) ->
  describe '<%= _.humanize(this.name) %> controller', () ->
    $scope = null
    createController = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      $controller = $injector.get '$controller'
      $rootScope = $injector.get '$rootScope'

      $scope = $rootScope.$new()

      createController = () ->
        $controller '<%= _.camelize(this.name) %>Controller',
          $scope: $scope

    it 'should load', () ->
      controller = createController()