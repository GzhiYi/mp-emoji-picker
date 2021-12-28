// 这个js只用来处理原数据，不需要使用
const emoji = require('./data-by-group')
const fs = require('fs')

// generate file
const file = './data-by-group.json'
const result = {}
Object.keys(emoji).forEach(group => {
  result[group] = emoji[group].map(item => {
    return {
      emoji: item.emoji,
      name: item.name
    }
  })
})
const data = JSON.stringify(result, null, 2)
fs.writeFileSync(file, data)
