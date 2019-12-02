const app = getApp();
const util = require("../../utils/util");

Page({
  data: {
    cognitiveLearningScene: ['通信展览馆', '校史陈列馆'],
    today: '',
    ifInput: false,
    ifSubmit: true,
    form: {
      contactMan: '1',
      contactUnit: '1',
      contactPhone: '1',
      place: '通信展览馆 ,校史陈列馆',
      date: '2010-11-19',
      time: '8:30',
      major: '1',
      class: '1',
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

  changeStatus(child) {
    let form = this.data.form;
    switch (child.detail.name) {
      case 'contactMan':
        form.contactMan = child.detail.value
        break;
      case 'contactUnit':
        form.contactUnit = child.detail.value
        break;
      case 'contactMan':
        form.contactMan = child.detail.value
        break;
      case 'contactPhone':
        form.contactPhone = child.detail.value
        break;
      case 'major':
        form.major = child.detail.value
        break;
      case 'class':
        form.class = child.detail.value
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
        result = false;
        this.setData({
          ifSubmit: false
        })
        break;
      }
    }
    if (result) {
      let form = this.data.form
      form.formId = e.detail.formId
      this.setData({
        form: form
      })
      util.submit(this.data.form, 2)
    }
  },

  onReady() {
    this.loginComponent = this.selectComponent("#login");
  },

  confirmEvent() {
    this.setData({
      ifSubmit: true
    })
  },

  download() {}

})