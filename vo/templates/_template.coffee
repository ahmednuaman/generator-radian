define [
  'lodash'
], (_) ->
  (data) ->
    _.assign data,
      aParam: true