const app = getApp()

Page({
  data: {
    teamFormScene: [{
        name: 'CEH',
        value: '通信展览馆'
      },
      {
        name: 'SHEH',
        value: '校史展览馆'
      },
    ],
    alumni: [{
        name: 'NO',
        value: '否',
        checked: 'true'
      },
      {
        name: 'YES',
        value: '是'
      }
    ]
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {

  }
})