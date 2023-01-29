const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  return res.status(StatusCodes.OK).json(products)
}

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ id: productId })
  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }
  return res.status(StatusCodes.OK).json(product)
}

module.exports = {
  getAllProducts,
  getSingleProduct
}
