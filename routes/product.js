const express = require('express')
const { createProduct,getAllProducts,getProductById,updateProduct ,deleteProduct,updateProductByAttribute} = require('../controller/product')
const routes = express.Router()


routes.post('/ecomm/api/v1/products',createProduct);
routes.get('/ecomm/api/v1/products',getAllProducts);
routes.get('/ecomm/api/v1/product/:id', getProductById);

routes.put('/ecomm/api/v1/product/:id', updateProduct)
routes.put('/ecomm/api/v1/product/:id/?queryValue={attribute}',updateProductByAttribute);
routes.delete('/ecomm/api/v1/product/:id', deleteProduct)
module.exports = {productRoutes: routes}