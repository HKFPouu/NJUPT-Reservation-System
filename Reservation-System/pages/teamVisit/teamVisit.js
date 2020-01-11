const util = require("../../utils/util");

Page({
  data: {
    today: '',
    ifInput: false,
    ifSubmit: false,
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
    teamLabel: [{
        label: '联系单位',
        name: 'contactUnit',
        type: 'text'
      },
      {
        label: '陪同领导',
        name: 'accompanyLeader',
        type: 'text'
      },
      {
        label: '联&ensp;系&ensp;人',
        name: 'contactMan',
        type: 'text'
      },
      {
        label: '联系电话',
        name: 'contactPhone',
        type: 'number'
      }
    ],
    guestLabel: [{
        label: '来&emsp;&emsp;宾',
        name: 'guest',
        type: 'text'
      },
      {
        label: '单位职务',
        name: 'UnitPosition',
        type: 'text'
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
      guest: '测试',
      UnitPosition: '测试',
      peopleNumber: 1,
      ifAlumni: false,
      pricpleSign: '',
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

  changeStatus(e) {
    let form = this.data.form;
    switch (e.currentTarget.id) {
      case 'contactUnit':
        form.contactUnit = e.detail.value
        break;
      case 'accompanyLeader':
        form.accompanyLeader = e.detail.value
        break;
      case 'contactMan':
        form.contactMan = e.detail.value
        break;
      case 'contactPhone':
        form.contactPhone = e.detail.value
        break;
      case 'guest':
        form.guest = e.detail.value
        break;
      case 'UnitPosition':
        form.UnitPosition = e.detail.value
        break;
      case 'welcomeMessage':
        form.welcomeMessage = e.detail.value
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
        console.log(key)
        result = false;
        this.setData({
          ifSubmit: true
        })
        break;
      }
    }
    if (result) {
      util.submit(this.data.form, 1)
      this.setData({
        ifSuccessSubmit: true
      })
    }

  },

  onReady() {
    this.dialogComponent = this.selectComponent(".dialog");
  },

  confirmEvent(e) {
    this.dialogComponent.hideLogin()
    this.setData({
      ifSuccessSubmit: false
    })
    if (e.target.id == 'successSubmit')
      wx.navigateBack({
        delta: 1
      })
  },

})