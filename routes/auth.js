const express = require('express')
const routes = express.Router()
const { signUp,signIn } = require('../controller/auth')
const {checkDuplicateUserNameAndEmail,checkRoles} = require('../middleware')

routes.post('/ecomm/api/v1/auth/signup',[checkDuplicateUserNameAndEmail,checkRoles],signUp)

routes.post('/ecomm/api/v1/auth/signin',signIn)
// routes.post('/ecomm/api/v1/auth/signup',signUp)
module.exports = {authRoutes : routes}