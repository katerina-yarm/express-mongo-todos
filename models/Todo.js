//3.1 подключаем из пакета mongoose, который работает с базой данных
const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Todo', schema)

//3.2 подключаем эту модель в роутере
