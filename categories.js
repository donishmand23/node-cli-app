const Model = require('./model/model.category.js')
const model = new Model()

console.table(model.getCategories())