const app = getApp()

Page({
  data: {
    cognitiveLearningScene: [{
        name: '通信展览馆',
        checked: ''
      },
      {
        name: '校史陈列馆',
        checked: ''
      }
    ],
    today: '',
    ifInput: false,
    form: {
      contactMan: '',
      contactUnit: '',
      contactPhone: '',
      place: [{
          name: '通信展览馆',
          checked: ''
        },
        {
          name: '校史陈列馆',
          checked: ''
        }
      ],
      date: '',
      time: '',
      major: '',
      class: '',
      status: false
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

  changeScene(child) {
    let form = this.data.form
    form.place[0].checked = ''
    form.place[1].checked = ''
    for (let item of child.detail) {
      if (item == '通信展览馆')
        form.place[0].checked = 'true'
      if (item == '校史陈列馆')
        form.place[1].checked = 'true'
    }
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
    let sendJson = JSON.parse(JSON.stringify(this.data.form))
    console.log(sendJson)
  },

  save: function () {
    wx.downloadFile({
      url: "",
      success(res) {
        console.log(res)
        var savePath = wx.env.USER_DATA_PATH + "/校内经费转账.docx.jpg"
        wx.getFileSystemManager()
          .saveFile({
            tempFilePath: res.tempFilePath,
            filePath: savePath,
            success(res2) {
              wx.saveImageToPhotosAlbum({
                filePath: savePath,
                success: (res) => {
                  wx.showModal({
                    title: '文件已保存到手机相册',
                    content: '位于tencent/MicroMsg/WeiXin下 \r\n将保存的文件重命名改为[ .docx ]后缀即可',
                    confirmColor: '#0bc183',
                    confirmText: '知道了',
                    showCancel: false
                  })
                }
              })
            }
          })
      }
    })
  },

  download() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              this.save()
            }
          })
        } else {
          this.save()
        }
      }
    });
  }

})