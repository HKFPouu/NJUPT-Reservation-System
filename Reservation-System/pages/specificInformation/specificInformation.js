const app = getApp()

Page({
  data: {
    pageId: null,
    formId: null,
    id: null,
    list: [],
    teamVisitList: {
      contactUnit: {
        label: '联系单位',
        value: ''
      },
      accompanyLeader: {
        label: '陪同领导',
        value: ''
      },
      contactMan: {
        label: '联&ensp;系&ensp;人',
        value: ''
      },
      contactPhone: {
        label: '联系电话',
        value: ''
      },
      contactUnit: {
        label: '参观场所',
        value: ''
      },
      date: {
        label: '参观日期',
        value: ''
      },
      time: {
        label: '参观时间',
        value: ''
      },
      guest: {
        label: '来&emsp;&emsp;宾',
        value: ''
      },
      position: {
        label: '单位职务',
        value: ''
      },
      peopleNumber: {
        label: '人&emsp;&emsp;数',
        value: ''
      },
      ifAlumni: {
        label: '是否校友',
        value: ''
      },
      welcomeMesag: {
        label: '欢迎语',
        value: ''
      },
      pricpleSign:  {
        label: '负&ensp;责&ensp;人',
        value: ''
      }
    },
    cognitiveLearningList: {
      contactMan: {
        label: '联&ensp;系&ensp;人',
        value: ''
      },
      contactUnit: {
        label: '联系单位',
        value: ''
      },
      contactPhone: {
        label: '联系电话',
        value: ''
      },
      place: {
        label: '参观场所',
        value: ''
      },
      date: {
        label: '参观日期',
        value: ''
      },
      time: {
        label: '参观时间',
        value: ''
      },
      major: {
        label: '专业',
        value: ''
      },
      class: {
        label: '班级',
          value: ''
      },
      pricpleSign:  {
        label: '负&ensp;责&ensp;人',
        value: ''
      }
    },
    changeStatusText: '确认申请'
  },

  onLoad(option) {
    let teamVisitList = app.globalData.teamVisitList;
    let cognitiveLearningList = app.globalData.cognitiveLearningList

    let pageId = option.pageId,
      id = option.id,
      list = option.pageId == 1 ? teamVisitList : cognitiveLearningList

    this.setData({
      pageId:pageId,
      id: id,
      list: list
    })

    let information = JSON.parse(JSON.stringify(this.data.list[id])),
      changeStatusText = information.status == 1 ? '取消申请' : '确认申请'
    information.ifAlumni = information.ifAlumni ? '是' : '否'
    delete information.status
    delete information.formId
    if (option.pageId == 2)
      delete information.ifAlumni
    information.place.replace(/,/, ' ')


    let label = option.pageId == 1 ? this.data.teamVisitList : this.data.cognitiveLearningList

    for (let key in information)
      if (label[key])
        label[key]['value'] = information[key]

    this.setData({
      label: label,
      changeStatusText: changeStatusText
    })
  },

  changeStatusRequest(id, status, listUrl) {
    const userId = app.globalData.userId;
    wx.getUserInfo({
      success(res) {
        wx.request({
          url: `http://139.9.140.149:8088/manage/${listUrl}`,
          data: {
            rawDate: res.rawData,
            user_id: userId,
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

  changeStatus(page,status) {
    const that = this
    const id = Number(that.data.id)
    const listUrl = page == 1 ? 'updateTeam' : 'updateLearn'
    wx.checkSession({
      success(res) {
        that.changeStatusRequest(id, status, listUrl)
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
                that.changeStatusRequest(id, status, listUrl)
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
      this.changeStatus(1, teamVisitList[this.data.id].status)
    } else {
      if (changeStatusText == '取消申请')
        cognitiveLearningList[this.data.id].status = 1
      else
        cognitiveLearningList[this.data.id].status = 2
      this.changeStatus(2, teamVisitList[this.data.id].status)
    }

    this.setData({
      changeStatusText: changeStatusText
    })

  }
})