define([
  'config',
  'angular',
  'collection/<%= _.slugify(name) %>-collection',
  'vo/stub-vo'
], function(cfg, A, collection, vo) {
  describe('<%= _.humanize(name) %> collection', function() {
    var $q,
        $rootScope;

    beforeEach(inject(function($injector) {
      $q = $injector.get('$q');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should return a nice collection', function() {
      var cb,
          data,
          datas,
          dfd;

      data = {};
      datas = [data, data, data];
      dfd = $q.defer();
      cb = {
        success: function(VOs) {
          expect(VOs.length).toBe(datas.length);
        }
      };

      dfd.promise.then(cb.success);
      collection(dfd, datas);
      $rootScope.$digest();
    });
  });
});
