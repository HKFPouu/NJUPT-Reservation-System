const app = getApp()

Page({
  data: {
    cognitiveLearningScene: ['通信展览馆', '校史陈列馆'],
    form: {
      contactMan: '',
      contactUnit: '',
      contactPhone: '',
      place: [],
      Date: '',
      time: '',
      major: '',
      class: ''
    }
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
  changeScene(child) {
    let form = this.data.form;
    form.place = [...child.detail]
    this.setData({
      form: form
    })
  },
  submit() {
    let sendJson = JSON.parse(JSON.stringify(this.data.form))
    console.log(sendJson)
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {

  }
})