define([
  'config',
  'angular',
  'directive/<%= _.slugify(name) %>-directive'
], function(cfg, A) {
  describe('<%= _.humanize(name) %> directive', function() {
    var el = A.element('<div data-<%= _.slugify(name) %> data-ng-model="dataItems"></div>'),
        $httpBackend,
        $scope,
        createDirective,
        data;

    beforeEach(module(cfg.ngApp));
    beforeEach(inject(function($injector) {
      var $compile = $injector.get('$compile'),
          $compiled = $compile(el),
          $rootScope = $injector.get('$rootScope');

      $httpBackend = $injector.get('$httpBackend');
      $scope = $rootScope.$new();

      createDirective = function() {
        return $compiled($scope);
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    data = [1, 2, 3, 4];

    it('should load', function() {
      var directive;

      $httpBackend.expectGET(cfg.path.partial + 'directive/<%= _.slugify(name) %>-partial.html')
        .respond(201, "<div class=\"<%= _.slugify(name) %>-component\"><ul><li data-ng-repeat=\"item in items\">{{item}}</li></ul></div>");

      directive = createDirective();
      $httpBackend.flush();

      $scope.dataItems = data;
      $scope.$digest();

      expect(el.find('li').length).toBe(data.length);
    });
  });
});
