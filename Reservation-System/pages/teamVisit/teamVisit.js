const app = getApp();
const util = require("../../utils/util");

Page({
  data: {
    today: '',
    ifInput: false,
    ifSubmit: true,
    ifSuccessSubmit: false,
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
      contactUnit: '测试',
      accompanyLeader: '测试',
      contactMan: '测试',
      contactPhone: '123',
      place: '测试',
      date: '2019-11-20',
      time: '15:30',
      gust: '测试',
      UnitPosition: '测试',
      peopleNumber: 1,
      ifAlumni: false,
      pricpleSign: '',
      form_id: '0',
      status: 0,
      welcomeMessage: '测试',
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

  submit(e) {
    let result = true
    for (let key in this.data.form) {
      if (this.data.form[key] === '' || this.data.form[key] === null) {
        console.log(key)
        result = false;
        this.setData({
          ifSubmit: false
        })
        break;
      }
    }
    if (result) {
      let form = this.data.form
      form.form_id = e.detail.formId
      this.setData({
        form: form
      })
      if (util.submit(this.data.form, 1, this.data.ifSuccessSubmit)) {
        this.setData({
          ifSuccessSubmit: true
        })
      }

    }

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