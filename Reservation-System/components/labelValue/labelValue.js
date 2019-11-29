Component({
  properties: {
    'label': String,
    'name': String,
    'ifInput': Boolean
  },
  methods: {
    changeStatus: function (e) {
      let tranObj = {
        name: e.target.id,
        value: e.detail.value
      }
      this.triggerEvent('changeStatus',tranObj)
    }
  }
})