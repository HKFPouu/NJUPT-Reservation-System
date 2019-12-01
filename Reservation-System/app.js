//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success(res) {
        wx.request({
          url: `http://139.9.140.149:8080/wLogin?code=${res.code}`,
          method: 'post',
          success(res) {
            console.log(res, res.data.data.roleId)
            that.globalData.role = res.data.data.roleId
            that.globalData.userId = res.data.data.userId
          }
        })
      }
    })
  },
  globalData: {
    userId: '',
    getList: false,
    role: 0,
    teamVisitList: {},
    cognitiveLearningList: {}
  }
})