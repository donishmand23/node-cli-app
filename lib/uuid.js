module.exports = function () {
	return (Date.now() + '').split('').reverse().slice(0, 4).join('')
}