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
			const categories = fs.readFileSync(this.#cPath, 'UTF-8')
			return categories ? JSON.parse(categories) : []
		} catch(error) {
			console.log(error.message)
		}
	}

	#getProductCount (categoryId) {
		try {
			let products = fs.readFileSync(this.#pPath, 'UTF-8')
			products = products ? JSON.parse(products) : []
			return products.reduce( (acc, el) => {
				if(el.categoryId == categoryId) return acc + +el.count
				else return acc
			}, 0 )
		} catch(error) {
			console.log(error.message)
		}
	}

	getCategories () {
		try {
			const categories = this.#read()
			return categories.map( el => {
				el.count = this.#getProductCount(el.categoryId)
				return el
			} )
		} catch(error) {
			console.log(error.message)
		}
	}

	addCategory (categoryName) {
		try {
			const categories = this.#read()
			if(categoryName && (/[0-9]/).test(categoryName.toLowerCase())) throw new Error("The category name must be string!")
			if( categories.some( el => el.categoryName == categoryName ) ) throw new Error("The category already exists!")
			categories.push({
				categoryId: uuid(),
				categoryName
			})
			fs.writeFileSync(this.#cPath, JSON.stringify(categories, null, 4))
			return true
		} catch(error) {
			console.log(error.message)
		}
	}
}