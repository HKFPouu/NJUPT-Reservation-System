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