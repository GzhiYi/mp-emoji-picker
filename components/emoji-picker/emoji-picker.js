const emoji = require('./data-by-group')
const DEFAULT_ACtIVE = '😀'
const HISTORY_LIMIT = 42

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    emojiKeys: Object.keys(emoji),
    active: DEFAULT_ACtIVE,
    emojis: emoji[DEFAULT_ACtIVE],
    scrollTop: 0,
    hasRecent: false
  },
  ready() {
    this.setDefaultStatus()
  },
  methods: {
    closeDialog() {
      this.setDefaultStatus()
      this.setData({
        visible: false
      })
      this.triggerEvent('closeDialog')
    },
    setDefaultStatus() {
      const emojis = wx.getStorageSync('emoji-picker-recent')
      const hasRecent = !!emojis
      this.setData({
        hasRecent,
        active: hasRecent ? 'recent' : DEFAULT_ACtIVE,
        emojis: hasRecent ? emojis : emoji[DEFAULT_ACtIVE]
      })
    },
    chooseGroup(event) {
      const { emojikey } = event.currentTarget.dataset
      if (emojikey === 'recent') {
        this.setDefaultStatus()
      } else {
        this.setData({
          active: emojikey,
          emojis: emoji[emojikey],
          scrollTop: 0
        })
      }
    },
    chooseEmoji(event) {
      const { emoji } = event.currentTarget.dataset
      let storeRecentEmoji = wx.getStorageSync('emoji-picker-recent') || []
      storeRecentEmoji.unshift(emoji)
      // remove repeat object via emoji key
      storeRecentEmoji = storeRecentEmoji.filter((item, index, self) => {
        return self.findIndex(t => t.emoji === item.emoji) === index
      })
      wx.setStorageSync('emoji-picker-recent', storeRecentEmoji.slice(0, HISTORY_LIMIT))
      this.setDefaultStatus()
      this.setData({
        visible: false
      })
      this.triggerEvent('onSelect', emoji)
    },
    onScroll(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    }
  }
})
