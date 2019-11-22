Component({
  properties: {
    'placeArr': Array
  },
  methods: {
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
  }
})