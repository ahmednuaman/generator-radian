define([
  'vo/<%= _.slugify(name) %>-vo'
], function(vo) {
  describe('<%= _.humanize(name) %> VO', function() {
    it('should return a nice VO', function() {
      var data,
          item;

      data = {
        foo: 'bar'
      };
      item = vo(data);

      expect(item.foo).toBe(data.foo);
    });
  });
});