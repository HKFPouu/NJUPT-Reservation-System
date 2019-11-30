const app = getApp()

Page({
  data: {
    role: 0
  },
  bindEntranceTap: function (event) {
    if(this.data.role == 1){
      let page = event.currentTarget.dataset.alphaBeta == 1 ? 'teamVisit' : 'cognitiveLearning'
      wx.navigateTo({
        url: `../${page}/${page}`
      })
    }else{
      let page = event.currentTarget.dataset.alphaBeta == 1 ? 'administrator-teamVisit' : 'administrator-cognitiveLearning'
      wx.navigateTo({
        url: `../${page}/${page}`
      })
    }
  },
  onReady: function () {
    this.loginComponent = this.selectComponent("#login");
  },

  showLogin: function () {
    this.loginComponent.showLogin();
  },

  confirmEvent: function () {
    this.loginComponent.hideLogin();
  },

})