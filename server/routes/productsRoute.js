const express = require('express')
const productRouter = express.Router()

const {
  getAllProducts,
  getSingleProduct
} = require('../controllers/productsController')

productRouter.route('/').get(getAllProducts)
productRouter.route('/:id').get(getSingleProduct)

module.exports = productRouter
