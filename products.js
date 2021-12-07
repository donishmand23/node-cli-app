const Model = require('./model/model.product.js')
const model = new Model()
const [,, categoryId ] = process.argv

console.table(model.getProducts(categoryId))