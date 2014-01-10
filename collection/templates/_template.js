define([
  'lodash',
  'vo/stub-vo'
], function(_, vo) {
  function(dfd, data) {
    var collection = _.map(data, vo);

    dfd.resolve(collection);
  };
});
