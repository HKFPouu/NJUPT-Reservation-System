Component({
  properties: {
    'label': String,
    'name': String,
    'ifInput': Boolean,
    'type': String
  },
  methods: {
    changeStatus: function (e) {
      let tranObj = {
        name: e.target.id,
        value: e.detail.value
      }
      this.triggerEvent('changeStatus', tranObj)
    }
  }
})