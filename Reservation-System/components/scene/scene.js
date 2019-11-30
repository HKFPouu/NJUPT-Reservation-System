Component({
  properties: {
    'placeArr': Array,
    'ifdisabled':Boolean
  },
  methods: {
    checkboxChange: function (e) {
      this.triggerEvent('changeScene',e.detail.value)
    },
  }
})