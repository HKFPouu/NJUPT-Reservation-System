module.exports = {
  submit: submit,
  getDay: getDay
}

function submit(form, listId) {
  const app = getApp()
  const userId = app.globalData.userId;

  const listUrl = listId == 1 ? 'teamVisit' : 'learnVisit'
  wx.checkSession({
    success(res) {
      submitRequest(form,listUrl,userId)
    },
    fail(res){
      wx.login({
        success(res) {
          wx.request({
            url: `http://139.9.140.149:8088/wLogin?code=${res.code}`,
            method: 'post',
            success(res) {
              app.globalData.role = res.data.data.roleId
              app.globalData.userId = res.data.data.userId
              submitRequest(form,listUrl,userId)
            }
          })
        }
      })
    }
  })
}

function submitRequest(form,listUrl,userId) {
  let sendJson = JSON.stringify(form)
  
  wx.getUserInfo({
    success(res) {
      wx.request({
        url: `http://139.9.140.149:8088/sub/${listUrl}`,
        method: 'post',
        data: {
          rawDate: res.rawData,
          user_id: userId,
          signature: res.signature,
          information: sendJson
        },
        success(res) {
          console.log(res)
        }
      })
    }
  })
}

function getDay(day) {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);
  let tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}