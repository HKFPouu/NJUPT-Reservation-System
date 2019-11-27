Component({
  properties: {
    'placeArr': Array
  },
  methods: {
    checkboxChange: function (e) {
      this.triggerEvent('changeScene',e.detail.value)
    },
  }
})