define([
  'service/radian-service'
], function(RS) {
  RS('<%= _.camelize(name) %>Service', [
    '$q',
    '$resource'
  ], {
    init: function() {
      this.fooBar = this.$resource('/foo/bar.json');
    }
  });
});