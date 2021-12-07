const Model = require('./model/model.product.js')
const model = new Model()
const [,, productId, productName ] = process.argv

model.addProduct(productName, productId) && console.log('New product has been added!')