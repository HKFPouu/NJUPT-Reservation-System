const app = getApp()

Page({
  data: {},
  bindEntranceTap: function (event) {
    let page = event.currentTarget.dataset.alphaBeta == 1 ? 'teamVisit' : 'cognitiveLearning'
    wx.navigateTo({
      url: `../${page}/${page}`
    })
  },
  onReady: function () {
    this.loginComponent = this.selectComponent("#login");
  },

  showLogin: function () {
    this.loginComponent.showLogin();
  },

  confirmEvent: function () {
    this.loginComponent.hideLogin();
    wx.login({
      success: res => {
        wx.request({
          url: `http://139.9.140.149:8080/wLogin?code=${res.code}`,
          method: 'post',
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
  },

})