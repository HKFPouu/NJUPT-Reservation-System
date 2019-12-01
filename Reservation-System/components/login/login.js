Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  data: {
    isShow: true
  },

  methods: {
    hideLogin() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    showLogin() {
      this.setData({
        isShow: !this.data.isShow
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