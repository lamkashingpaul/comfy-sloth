const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const Airtable = require('airtable')
const table = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN
}).base(process.env.AIRTABLE_BASE_ID).table(process.env.AIRTABLE_TABLE)

const getAllProducts = async (req, res) => {
  const products = []

  await table
    .select({
      fields: ['id', 'name', 'price', 'images', 'featured', 'colors', 'company', 'description', 'category', 'shipping'],
      view: 'Grid view'
    })
    .all()
    .then((records) => {
      records.forEach((record) => {
        const { fields } = record._rawJson
        const image = (fields.images && fields.images[0]?.url) || ''
        delete fields.images
        products.push({ ...fields, image })
      })
    })
    .catch((err) => {
      if (err) {
        const error = new Error(err.message)
        error.name = err.error
        error.statusCode = err.statusCode
        throw error
      }
    })

  return res.status(StatusCodes.OK).json(products)
}

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params

  const products = []
  await table
    .select({
      maxRecords: 1,
      filterByFormula: `{id} = "${productId}"`,
      view: 'Grid view'
    })
    .all()
    .then((records) => {
      records.forEach((record) => {
        products.push({ ...record._rawJson.fields })
      })
    })
    .catch((err) => {
      if (err) {
        const error = new Error(err.message)
        error.name = err.error
        error.statusCode = err.statusCode
        throw error
      }
    })

  if (products.length === 0) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  return res.status(StatusCodes.OK).json(products[0])
}

module.exports = {
  getAllProducts,
  getSingleProduct
}
