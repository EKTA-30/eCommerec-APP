const express = require('express')
const {createCategory, getAllCategory,
getCategoryOnId, updateCategory, deleteCategory} = require('../controller/category')
const routes = express.Router()


routes.post('/ecomm/api/v1/category',createCategory)

routes.get('/ecomm/api/v1/categories',getAllCategory)

routes.get('/ecomm/api/v1/category/:id', getCategoryOnId)

routes.put('/ecomm/api/v1/category/:id', updateCategory)

routes.delete('/ecomm/api/v1/category/:id', deleteCategory)

module.exports = {categoryRoutes:routes}