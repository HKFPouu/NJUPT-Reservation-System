const app = getApp();

Page({
  data: {
    today: '',
    ifInput: false,
    teamFormScene: ['通信展览馆', '校史展览馆'],
    alumni: [{
        name: '',
        value: '否',
        checked: 'true'
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
      place: [],
      date: '',
      time: '',
      gust: '',
      UnitPosition: '',
      peopleNumber: 1,
      ifAlumni: false,
      welcomeMessage: ''
    }
  },

  onShow() {
    let today = new Date().toLocaleDateString().replace(/\\/g,"-");
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
    let form = this.data.form;
    form.place = [...child.detail]
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
    }
    this.setData({
      form: form
    })
  },

  submit() {
    let sendJson = JSON.parse(JSON.stringify(this.data.form))
    console.log(sendJson)
  }

})