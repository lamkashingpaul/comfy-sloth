const express = require('express')
const authenticationMiddleware = require('../middleware/authentication')
const { calculateOrderAmount, createClientSecret } = require('../controllers/stripeController')

const stripeRouter = express.Router()

stripeRouter.route('/').post(authenticationMiddleware, calculateOrderAmount, createClientSecret)

module.exports = stripeRouter
