const app = getApp()
const teamVisitLabel = ['联系单位', '陪同领导', '联&ensp;系&ensp;人', '联系电话', '参观场所', '参观日期', '参观时间', '来&emsp;&emsp;宾', '单位职务', '人&emsp;&emsp;数', '是否校友', '欢&ensp;迎&ensp;语']
const cognitiveLearningLabel = ['联&ensp;系&ensp;人', '联系单位', '联系电话', '参观场所', '参观日期', '参观时间', '专业', '班级']

Page({
  data: {
    pageId: null,
    formId: null,
    id: null,
    labelList: [],
    information: {},
    list: [],
    changeStatusText: '确认申请'
  },

  onLoad(option) {
    let teamVisitList = app.globalData.teamVisitList;
    let cognitiveLearningList = app.globalData.cognitiveLearningList

    let pageId = option.pageId,
      id = option.id,
      formId = option.form_id,
      labelList = pageId == 1 ? teamVisitLabel : cognitiveLearningLabel,
      list = pageId == 1 ? teamVisitList : cognitiveLearningList

    this.setData({
      id: id,
      form_id: formId,
      pageId: pageId,
      labelList: labelList,
      list: list
    })

    let information = JSON.parse(JSON.stringify(this.data.list[id])),
      changeStatusText = information.status == 1 ? '取消申请' : '确认申请'
    information.ifAlumni = information.ifAlumni ? '是' : '否'
    delete information.status
    if (this.data.pageId == 2)
      delete information.ifAlumni
    information.place.replace(/,/, '')
    delete information.formId

    this.setData({
      information: information,
      changeStatusText: changeStatusText
    })
  },

  changeStatusRequest(id, status, listUrl, formId) {
    const userId = app.globalData.userId;
    wx.getUserInfo({
      success(res) {
        wx.request({
          url: `http://139.9.140.149:8088/manage/${listUrl}`,
          data: {
            rawDate: res.rawData,
            user_id: userId,
            form_id: formId,
            signature: res.signature,
            formId: id,
            status: status
          },
          method: 'post',
          success(res) {
            console.log(res)
          },
        });
      }
    })
  },

  changeStatus(page) {
    let teamVisitList = app.globalData.teamVisitList;
    const that = this
    const id = Number(that.data.id)
    const formId = that.data.form_id
    const status = teamVisitList[that.data.id].status
    const listUrl = page == 1 ? 'updateTeam' : 'updateLearn'
    wx.checkSession({
      success(res) {
        that.changeStatusRequest(id, status, listUrl, formId)
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
                that.changeStatusRequest(id, status, listUrl, formId)
              }
            })
          }
        })
      }
    })
  },

  bindChangeStatus() {
    let teamVisitList = app.globalData.teamVisitList;
    let cognitiveLearningList = app.globalData.cognitiveLearningList

    let changeStatusText = this.data.changeStatusText == '确认申请' ? '取消申请' : '确认申请'

    if (this.data.pageId == 1) {
      changeStatusText == '取消申请' ?
        teamVisitList[this.data.id].status = 1 :
        teamVisitList[this.data.id].status = 2
      this.changeStatus(1)
    } else {
      if (changeStatusText == '取消申请')
        cognitiveLearningList[this.data.id].status = 1
      else
        cognitiveLearningList[this.data.id].status = 2
      this.changeStatus(2)
    }

    this.setData({
      changeStatusText: changeStatusText
    })

  }
})