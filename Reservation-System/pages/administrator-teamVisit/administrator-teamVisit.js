const app = getApp()
const applyList = app.globalData.applyList;

Page({
  data: {
    applyList: applyList
  },
  specificInformation(e) {
    let index = e.currentTarget.id.replace(/item/, '')
    wx.navigateTo({
      url: `../teamVisit-specificInformation/teamVisit-specificInformation?id=${index}`
    })
  }
})