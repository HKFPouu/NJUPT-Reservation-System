const app = getApp()

Page({
  data: {},
  bindEntranceTap: function (event) {
    let page = event.currentTarget.dataset.alphaBeta == 1 ? 'teamVisit' : 'cognitiveLearning'
    wx.navigateTo({
      url: `../${page}/${page}`
    })
  },
  onLoad: function () {},
  getUserInfo: function (e) {}
})