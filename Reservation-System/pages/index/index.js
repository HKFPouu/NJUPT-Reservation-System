const app = getApp()

Page({
  data: {
    role: '',
    pageId: 0
  },
  bindEntranceTap(event) {
    let role = app.globalData.role,
      pageId = event.currentTarget.dataset.alphaBeta

    this.setData({
      role: role,
      pageId: pageId
    })

    if (this.data.role == 1) { // 更改身份 0普通 1管理
      let page = this.data.pageId == 1 ? 'teamVisit' : 'cognitiveLearning'
      wx.navigateTo({
        url: `../${page}/${page}`
      })
    } else {
      const that = this
      let listUrl = this.data.pageId == 1 ? 'teamVisit' : 'learnVisit'
      wx.checkSession({
        success(res) {
          that.getUser(listUrl, that.data.pageId)
        },
        fail(res) {
          wx.login({
            success(res) {
              wx.request({
                url: `http://139.9.140.149:8088/wLogin?code=${res.code}`,
                method: 'post',
                success(res) {
                  app.globalData.role = res.data.data.roleId
                  app.globalData.userId = res.data.data.userId
                  that.getUser(listUrl, that.data.pageId)
                }
              })
            }
          })
        }
      })
    }
  },
  getUser(listUrl, id) {
    const userId = app.globalData.userId

    wx.getUserInfo({
      success(res) {
        wx.request({
          url: `http://139.9.140.149:8088/get/${listUrl}`,
          method: 'post',
          data: {
            rawDate: res.rawData,
            user_id: userId,
            signature: res.signature
          },
          success(res) {
            let obj = new Object()
            for (let item of res.data.data)
              obj[item.formId] = item
            listUrl == 'teamVisit' ?
              app.globalData.teamVisitList = obj :
              app.globalData.cognitiveLearningList = obj
            wx.navigateTo({
              url: `../administrator/administrator?id=${id}`
            })
          }
        })
      }
    })
  },
  onReady() {
    this.loginComponent = this.selectComponent("#login");
  },

  showLogin() {
    this.loginComponent.showLogin();
  },

  confirmEvent() {
    this.loginComponent.hideLogin();
  },

})