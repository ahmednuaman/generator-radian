define [
  'controller/radian-controller'
], (RC) ->
  class extends RC
    @register '<%= _.classify(name) %>Controller', [
      '$scope'
    ]

    init: () ->