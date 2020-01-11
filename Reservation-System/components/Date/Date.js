const hours = [8, 9, 10, 11, 14, 15, 16]
const mins_ts = [],
  mins_zs = [],
  mins_zt = []

for (let i = 30; i < 60; i++) {
  mins_ts.push(i)
}
for (let i = 0; i < 60; i++) {
  mins_zs.push((Array(2).join(0) + i).slice(-2))
}
for (let i = 0; i <= 30; i++) {
  mins_zt.push((Array(2).join(0) + i).slice(-2))
}


Component({
  properties: {
    'today': String
  },
  data: {
    calendarConfig: {
      theme: 'elegant',
      inverse: true,
      highlightToday: true,
      disablePastDay: true
    },
    ifShowCalendar: 'hiddenCalendar',
    ifShowTimeSelector: 'hiddenTimeSelector',
    hours: hours,
    hour: 8,
    min: 0,
    mins: mins_ts,
    time: '8:30',
    date: ''
  },

  methods: {
    ifShowCalendar() {
      if (this.data.ifShowTimeSelector !== 'showTimeSelector') {
        let ifShowCalendar = this.data.ifShowCalendar == 'showCalendar' ? 'hiddenCalendar' : 'showCalendar'
        this.setData({
          ifShowCalendar: ifShowCalendar
        })
      }
    },

    ifShowTimeSelector() {
      if (this.data.ifShowCalendar !== 'showCalendar') {
        let ifShowTimeSelector = this.data.ifShowTimeSelector == 'showTimeSelector' ? 'hiddenTimeSelector' : 'showTimeSelector'
        this.setData({
          ifShowTimeSelector: ifShowTimeSelector
        })
      }
    },

    afterTapDay(e) {
      let date = `${e.detail.year}-${e.detail.month}-${e.detail.day}`
      this.setData({
        date: date
      })
      this.ifShowCalendar()
      this.triggerEvent('changeDate', this.data.date)
    },

    changeTime: function (e) {
      const val = e.detail.value;

      this.setData({
        hour: this.data.hours[val[0]],
        min: this.data.mins[val[1]]
      })

      let mins = this.data.mins
      mins.splice(0, mins.length)

      switch (this.data.hour) {
        case 8:
          mins = [...mins_ts];
          break;
        case 9:
        case 10:
        case 14:
        case 15:
          mins = [...mins_zs];
          break;
        case 11:
        case 16:
          mins = [...mins_zt];
          break;
      }

      this.setData({
        mins: mins
      })

      let time = `${this.data.hour}:${this.data.min}`
      this.setData({
        time: time
      })
      this.ifShowCalendar()
      this.triggerEvent('changeTime',this.data.time)

    }

  }
})