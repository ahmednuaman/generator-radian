define([
  'lodash',
  'vo/stub-vo'
], function(_, vo) {
  return function(dfd, data) {
    var collection = _.map(data, vo);

    dfd.resolve(collection);
  };
});
