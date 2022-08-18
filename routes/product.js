const express = require('express')
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,filterBasedOnProduct} 
= require('../controller/product')

const { validateProductData ,verifyToken,isAdmin} = require('../middleware')
const routes = express.Router()

routes.post('/ecomm/api/v1/product',[validateProductData,verifyToken,isAdmin], createProduct)

routes.get('/ecomm/api/v1/products',getAllProducts)
routes.get('/ecomm/api/v1/products/filter', filterBasedOnProduct)

routes.get('/ecomm/api/v1/product/:id', getProductById)

routes.put('/ecomm/api/v1/product/:id',[verifyToken,isAdmin], updateProduct)

routes.delete('/ecomm/api/v1/product/:id',[verifyToken,isAdmin] ,deleteProduct)

module.exports = {productRoutes: routes}