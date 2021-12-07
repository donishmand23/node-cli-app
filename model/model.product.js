const fs = require('fs')
const path = require('path')
const uuid = require('../lib/uuid.js')

module.exports = class {
	#cPath
	#pPath
	constructor() {
		this.#cPath = path.join(process.cwd(), 'database', 'categories.json')
		this.#pPath = path.join(process.cwd(), 'database', 'products.json')
	}

	#read () {
		try {
			const products = fs.readFileSync(this.#pPath, 'UTF-8')
			return products ? JSON.parse(products) : []
		} catch(error) {
			console.log(error.message)
		}
	}

	#getCategoryName (categoryId) {
		try {
			let categories = fs.readFileSync(this.#cPath, 'UTF-8')
			categories = categories ? JSON.parse(categories) : []
			let found =  categories.find( el => el.categoryId == categoryId )
			return found ? found.categoryName : found
		} catch(error) {
			console.log(error.message)
		}
	}

	getProducts (categoryId) {
		try {
			let products = this.#read()
			return products.filter( el => {
				el.categoryName = this.#getCategoryName(el.categoryId)
				let condition = categoryId ? el.categoryId == categoryId : true
				delete el.categoryId
				return condition
			} )
		} catch(error) {
			console.log(error.message)
		}
	}

	addProduct (productName, categoryId) {
		try {
			if(!productName || !categoryId) throw new Error("Product name and category id must be supplied!")
			if(!this.#getCategoryName(categoryId)) throw new Error("There is no such category")
			let products = this.#read()
			let product = products.find( el => el.productName == productName )
			if(product) {
				product.count = +product.count + 1
			} else {
				products.push({
					productId: uuid() + '',
					categoryId,
					productName,
					count: 1
				})
			}
			fs.writeFileSync(this.#pPath, JSON.stringify(products, null, 4))
			return true
		} catch(error) {
			console.log(error.message)
		}
	}

	
}