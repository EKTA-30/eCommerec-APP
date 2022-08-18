const {checkNameForCategory} = require('./category')
const { validateProductData } = require('./product')
const {checkDuplicateUserNameAndEmail,checkRoles} = require('./user')
const {verifyToken,isAdmin} = require('./authJWT')

module.exports = {
	checkNameForCategory,
	validateProductData,
	checkDuplicateUserNameAndEmail,
	checkRoles,
	verifyToken,
	isAdmin
}