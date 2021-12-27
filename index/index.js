const app = getApp()

Page({
  data: {
    emoji: '',
    pickerVisiable: false
  },
  onSelect(event) {
    const { emoji } = event.detail
    this.setData({
      emoji,
      pickerVisiable: false
    })
  },
  changeVisible() {
    this.setData({
      pickerVisiable: true
    })
  }
})
