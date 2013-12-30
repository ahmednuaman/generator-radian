define [
  'config'
  'angular'
  'controller/<%= _.slugify(name) %>-controller'
], (cfg, A) ->
  describe '<%= _.humanize(name) %> controller', () ->
    $scope = null
    createController = null

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      $controller = $injector.get '$controller'
      $rootScope = $injector.get '$rootScope'

      $scope = $rootScope.$new()

      createController = () ->
        $controller '<%= _.camelize(name) %>Controller',
          $scope: $scope

    it 'should load', () ->
      controller = createController()