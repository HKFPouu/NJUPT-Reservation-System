const app = getApp()

Page({
  data: {
    pageId: 0,
    list: []
  },
  onLoad(option) {
    const pageId = option.id

    this.setData({
      pageId: pageId
    })
  },
  onShow() {
    const teamVisitList = JSON.parse(JSON.stringify(app.globalData.teamVisitList)),
      cognitiveLearningList = JSON.parse(JSON.stringify(app.globalData.cognitiveLearningList));

    let list = this.data.pageId == 1 ? teamVisitList : cognitiveLearningList
    for (let item in list) {
      list[item].status = list[item].status == 1 ? '已确认' : list[item].status == 0 ? '未确认' : '已拒绝'
    }
    this.setData({
      list: list
    })
  },
  specificInformation(e) {
    let index = e.currentTarget.id.replace(/item/,'')
    wx.navigateTo({
      url: `../specificInformation/specificInformation?pageId=${this.data.pageId}&id=${index}`
    })
  }
})