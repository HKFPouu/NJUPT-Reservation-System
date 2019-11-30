const app = getApp()
const applyList = app.globalData.applyList;

Page({
  data: {
    id:'',
    labelList: ['联系单位', '陪同领导', '联&ensp;系&ensp;人', '联系电话', '参观日期', '参观时间', '来&emsp;&emsp;宾', '单位职务', '人&emsp;&emsp;数', '是否校友', '欢&ensp;迎&ensp;语'],
    information: {},
    place: [],
    applyList: applyList,
    changeStatusText: '确认申请'
  },
  onLoad: function (option) {
    let id = option.id
    this.setData({
      id:id
    })
    let information = this.data.applyList[id],
      place = information.place
    information.ifAlumni = information.ifAlumni ? '是' : '否'
    delete information.status
    delete information.place
    this.setData({
      information: information,
      place: place
    })
    console.log(this.data, applyList)
  },
  changeStatus() {
    let changeStatusText = this.data.changeStatusText == '确认申请' ? '取消申请' : '确认申请'
      applyList[this.data.id].status = !applyList[this.data.id].status
    this.setData({
      changeStatusText: changeStatusText
    })
    console.log(app.globalData.applyList)
  }
})