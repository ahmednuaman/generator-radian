define [
  'vo/<%= _.slugify(name) %>-vo'
], (vo) ->
  describe '<%= _.humanize(name) %> VO', () ->
    it 'should return a nice VO', () ->
      data =
        foo: 'bar'
      item = vo data

      expect(item.foo).toBe data.foo