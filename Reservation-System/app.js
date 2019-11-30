//app.js
App({
  onLaunch: function () {
    const that = this;
    wx.login({
      success: res => {
        wx.request({
          url: `http://139.9.140.149:8080/wLogin?code=${res.code}`,
          method: 'post',
          success: function (res) {
            console.log(res,res.data.data.roleId)
            that.setData({
              role:res.data.data.roleId
            })
          }
        })
      }
    })
  },
  globalData: {
    applyList: {
      1:{
      contactUnit: '联系单位',
      accompanyLeader: '陪同领导',
      contactMan: '联系人',
      contactPhone: '123123123',
      place: [
        {
          name: '通信展览馆',
          checked: 'false'
        },
        {
          name: '校史展览馆',
          checked: 'true'
        }
      ],
      date: '2019-11-29',
      time: '15:30',
      gust: '来宾',
      UnitPosition: '单位职务',
      peopleNumber: 1,
      ifAlumni: false,
      welcomeMessage: '欢迎来',
      status: false
    }, 
    2:{
      contactUnit: '联系单位',
      accompanyLeader: '陪同领导',
      contactMan: '联系人',
      contactPhone: '123123123',
      place: [],
      date: '2019-11-29',
      time: '15:30',
      gust: '来宾',
      UnitPosition: '单位职务',
      peopleNumber: 1,
      ifAlumni: false,
      welcomeMessage: '欢迎来',
      status: false
    }}
  }
})