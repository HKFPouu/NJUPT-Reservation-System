const app = getApp();
const util = require("../../utils/util");

Page({
  data: {
    today: '',
    ifInput: false,
    ifSubmit: true,
    teamFormScene: ['通信展览馆', '校史展览馆'],
    alumni: [{
        name: '',
        value: '否'
      },
      {
        name: 'true',
        value: '是'
      }
    ],
    form: {
      contactUnit: '',
      accompanyLeader: '',
      contactMan: '',
      contactPhone: '',
      place: '',
      date: '2019-11-20',
      time: '15:30',
      gust: '',
      UnitPosition: '',
      peopleNumber: 1,
      ifAlumni: false,
      pricpleSign: '',
      status: 0,
      welcomeMessage: '',
    }
  },

  onShow() {
    let today = new Date().toLocaleDateString().replace(/\\/g, "-");
    this.setData({
      today: today
    })
  },

  radioChange(e) {
    let form = this.data.form;
    form.ifAlumni = !!e.detail.value
    this.setData({
      form: form
    })
  },

  changeNum(child) {
    let form = this.data.form;
    form.peopleNumber = child.detail
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

  changeScene(child) {
    let form = this.data.form
    form.place = child.detail.join(',')
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

  changeStatus(child) {
    let form = this.data.form;
    switch (child.detail.name) {
      case 'contactUnit':
        form.contactUnit = child.detail.value
        break;
      case 'accompanyLeader':
        form.accompanyLeader = child.detail.value
        break;
      case 'contactMan':
        form.contactMan = child.detail.value
        break;
      case 'contactPhone':
        form.contactPhone = child.detail.value
        break;
      case 'gust':
        form.gust = child.detail.value
        break;
      case 'UnitPosition':
        form.UnitPosition = child.detail.value
        break;
      case 'welcomeMessage':
        form.welcomeMessage = child.detail.value
        break;
      default:
        break;
    }
    this.setData({
      form: form
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
    if (result)
      util.submit(this.data.form, 1)

  },

  onReady() {
    this.loginComponent = this.selectComponent("#login");
  },

  confirmEvent() {
    this.setData({
      ifSubmit: true
    })
  }
})