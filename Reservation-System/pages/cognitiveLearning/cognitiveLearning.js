const app = getApp();
const util = require("../../utils/util");

Page({
  data: {
    cognitiveLearningScene: ['通信展览馆', '校史陈列馆'],
    today: '',
    ifInput: false,
    ifSubmit: false,
    ifSuccessSubmit: false,
    teamLabel: [{
        label: '联&ensp;系&ensp;人',
        name: 'contactMan',
        type: 'text'
      }, {
        label: '联系单位',
        name: 'contactUnit',
        type: 'text'
      }, {
        label: '电&emsp;&emsp;话',
        name: 'contactPhone',
        type: 'number'
      }
    ],
    guestLabel: [{
      label: '专&emsp;&emsp;业',
      name: 'major',
      type: 'text'
    }, {
      label: '班&emsp;&emsp;级',
      name: 'class',
      type: 'text'
    }
  ],
    form: {
      contactMan: '1',
      contactUnit: '1',
      contactPhone: '1',
      place: '通信展览馆 ,校史陈列馆',
      date: '2010-11-19',
      time: '8:30',
      major: '1',
      class: '1',
      form_id: '0',
      status: 0,
      pricpleSign: '1'
    }
  },

  onShow() {
    let today = new Date().toLocaleDateString().replace(/\\/g, "-");
    this.setData({
      today: today
    })
  },

  changeNum(child) {
    let form = this.data.form;
    form.peopleNumber = child.detail
    this.setData({
      form: form
    })
  },

  changeStatus(e) {
    let form = this.data.form;
    switch (e.detail.name) {
      case 'contactMan':
        form.contactMan = e.detail.value
        break;
      case 'contactUnit':
        form.contactUnit = e.detail.value
        break;
      case 'contactMan':
        form.contactMan = e.detail.value
        break;
      case 'contactPhone':
        form.contactPhone = e.detail.value
        break;
      case 'major':
        form.major = e.detail.value
        break;
      case 'class':
        form.class = e.detail.value
        break;
    }
    this.setData({
      form: form
    })
  },

  changeTeamSign(e) {
    let form = this.data.form;
    form.pricpleSign = e.detail.value
    this.setData({
      form: form
    })
  },

  changeScene(child) {
    let form = this.data.form
    form.place = child.detail.join(',')
    this.setData({
      form: form
    })
  },

  changeDate(child) {
    let form = this.data.form,
      ifInput = child.detail.ifInput
    form.date = child.detail.date
    this.setData({
      form: form,
      ifInput: ifInput
    })
  },

  changeTime(child) {
    let form = this.data.form,
      ifInput = child.detail.ifInput
    form.time = child.detail.time
    this.setData({
      form: form,
      ifInput: ifInput
    })
  },

  submit() {
    let result = true
    for (let key in this.data.form) {
      if (this.data.form[key] === '' || this.data.form[key] === null) {
        console.log(key)
        result = false;
        this.setData({
          ifSubmit: true
        })
        break;
      }
    }
    if (result) {
      util.submit(this.data.form, 2)
      this.setData({
        ifSuccessSubmit: true
      })
    }

  },

  onReady() {
    this.dialogComponent = this.selectComponent(".dialog");
  },

  confirmEvent(e) {
    let target = e.target.id.replace(/dialog /, '')
    this.dialogComponent.hideLogin()
    if (target == 'successSubmit') {
      this.setData({
        ifSubmit: false
      })
      wx.navigateTo({
        url: '../index/index'
      })
    } else {
      this.setData({
        ifSuccessSubmit: false
      })
    }
  },

  download() {}

})