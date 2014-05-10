define [
  'config'
  'angular'
  'directive/<%= _.slugify(name) %>-directive'
], (cfg, A) ->
  describe '<%= _.humanize(name) %> directive', () ->
    $httpBackend = null
    $scope = null
    createDirective = null
    el = A.element '<div data-<%= _.slugify(name) %> data-ng-model="dataItems"></div>'

    beforeEach module cfg.ngApp

    beforeEach inject ($injector) ->
      $compile = $injector.get '$compile'
      $httpBackend = $injector.get '$httpBackend'
      $rootScope = $injector.get '$rootScope'

      $compiled = $compile el
      $scope = $rootScope.$new()

      createDirective = () ->
        $compiled $scope

    afterEach () ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    data = [1, 2, 3, 4]

    it 'should load', () ->
      $httpBackend.expectGET("#{cfg.path.partial}directive/<%= _.slugify(name) %>-partial.html")
        .respond 201, """
          <div class="<%= _.slugify(name) %>-component">
            <ul>
              <li data-ng-repeat="item in items">
                {{item}}
              </li>
            </ul>
          </div>"""

      directive = createDirective()

      $httpBackend.flush()

      $scope.dataItems = data
      $scope.$digest()

      expect(el.find('li').length).toBe data.length