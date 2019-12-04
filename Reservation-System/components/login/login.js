Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    title: String,
    content: String,
    confirmText: String,
    Hidden: Boolean
  },

  methods: {
    hideLogin() {
      console.log(this.data.Hidden)
      this.setData({
        Hidden: true
      })
    },
    confirmEvent() {
      this.triggerEvent("confirmEvent");
    },

    bindGetUserInfo(e) {
      this.triggerEvent("bindGetUserInfo", {
        event: e
      });
    }

  }
})