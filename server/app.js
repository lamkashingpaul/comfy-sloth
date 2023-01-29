require('dotenv').config()
require('express-async-errors')
require('mongoose').set('strictQuery', false)

const path = require('path')

const connectDB = require('./db/connect')

const express = require('express')
const app = express()

const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const stripeRouter = require('./routes/stripeRoute')
const productsRouter = require('./routes/productsRoute')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const port = process.env.PORT || 3000

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000
}))

app.use(helmet.contentSecurityPolicy({
  directives: {
    'connect-src': [
      "'self'",
      `https://${process.env.AUTH0_DOMAIN}`,
      'https://course-api.com/react-store-products',
      'https://course-api.com/react-store-single-product'
    ],
    'frame-src': [
      "'self'",
      `https://${process.env.AUTH0_DOMAIN}`,
      'https://js.stripe.com'],
    'img-src': ["'self'", 'https://v5.airtableusercontent.com'],
    'script-src': ["'self'", 'https://js.stripe.com']
  }
}))

app.use(cors())
app.use(xss())

app.use(express.static(path.resolve(__dirname, '../client/build/')))
app.use(express.json())

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/stripe', stripeRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()