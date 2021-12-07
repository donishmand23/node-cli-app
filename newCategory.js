const Model = require('./model/model.category.js')
const model = new Model()
const [,, categoryName ] = process.argv

model.addCategory(categoryName) && console.log('New category has been added!')