require('dotenv').config()

const Product = require('./models/Product')
const products = require('./mock-data.json')
const connectDB = require('./db/connect')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(products)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
