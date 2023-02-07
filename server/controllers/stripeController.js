const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Airtable = require('airtable')
const table = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN
}).base(process.env.AIRTABLE_BASE_ID).table(process.env.AIRTABLE_TABLE)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = async (req, res, next) => {
  const { cart, totalAmount, shippingFee } = req.body
  if (!cart || !totalAmount || !shippingFee) {
    throw new BadRequestError('`cart`, `totalAmount` and `shippingFee` must be provided.')
  }

  if (shippingFee !== 534) {
    throw new BadRequestError('Invalid shipping fee')
  }

  const results = await Promise.allSettled(cart.map(async (item) => {
    const { id: itemId, amount, price } = item
    const productId = itemId.substring(0, itemId.lastIndexOf('#'))
    const productColor = itemId.substring(itemId.lastIndexOf('#'), itemId.length)

    const products = []
    await table
      .select({
        maxRecords: 1,
        filterByFormula: `AND({id} = "${productId}", FIND("${productColor}", colors) > 0)`,
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
      throw new BadRequestError(`No product with id: ${productId} and color: ${productColor}`)
    }

    if (price !== products[0].price) {
      throw new BadRequestError(`Invalid price for product with id: ${productId} and color: ${productColor}`)
    }

    if (amount > products[0].stock) {
      throw new BadRequestError(`Invalid amount for product with id: ${productId} and color: ${productColor}`)
    }

    return amount * price
  }))

  const rejected = results.filter((p) => p.status === 'rejected')
  if (rejected && rejected.length > 0) {
    throw rejected[0].reason
  }

  const expectedTotalAmount = results.reduce((acc, cur) => acc + cur.value, 0)

  if (totalAmount !== expectedTotalAmount) {
    throw new BadRequestError('Invalid total amount')
  }

  req.verifiedTotalAmount = totalAmount + shippingFee

  next()
}

const createClientSecret = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.verifiedTotalAmount,
    currency: 'usd'
  })

  return res.status(StatusCodes.CREATED).json({ clientSecret: paymentIntent.client_secret })
}

module.exports = {
  calculateOrderAmount,
  createClientSecret
}
