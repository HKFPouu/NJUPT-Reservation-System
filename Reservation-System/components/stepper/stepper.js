Component({
  properties: {},
  data: {
    num: 1,
    minusStatus: 'disabled'
  },
  methods: {
    bindMinus: function () {
      let num = this.data.num;
      if (num > 1)
        num--;
      let minusStatus = num <= 1 ? 'disabled' : 'normal';
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    bindPlus: function () {
      let num = this.data.num;
      num++;
      let minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    bindManual: function (e) {
      let num = e.detail.value;
      this.setData({
        num: num
      });
    }
  }
})